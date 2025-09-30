import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();
      if (properties) {
      }
      this.groups = new Map();
      this.loadedAudio = new Map();
      this.loadedGroups = new Map();
      this._lastLoadedGroup = null;
      this._lastUnloadedGroup = null;
      this._lastLoadedAudio = null;
      this._lastUnloadedAudio = null;

      this._addDOMMessageHandler(
        "update-audio-loaded-status",
        ([audio, loaded]) => {
          this._updateLoadedAudioStatus(audio, loaded);
        }
      );
    }

    _updateLoadedAudioStatus(audio, loaded) {
      let curLoadedStatus = this.loadedAudio.get(audio) || false;
      if (curLoadedStatus === loaded) return;
      this.loadedAudio.set(audio, loaded);

      if (loaded) {
        this._lastLoadedAudio = audio;
        this._trigger("OnAudioLoaded");
      } else {
        this._lastUnloadedAudio = audio;
        this._trigger("OnAudioUnloaded");
      }

      for (const group of this.groups.values()) {
        if (group.has(audio)) {
          if (loaded && !this.loadedGroups.has(group)) {
            for (const audio of group) {
              if (!this.loadedAudio.has(audio)) {
                return;
              }
            }
            this.loadedGroups.set(group, true);
            this._lastLoadedGroup = group;
            this._trigger("OnGroupLoaded");
          } else if (!loaded && this.loadedGroups.has(group)) {
            for (const audio of group) {
              if (this.loadedAudio.has(audio)) {
                return;
              }
            }
            this.loadedGroups.delete(group);
            this._lastUnloadedGroup = group;
            this._trigger("OnGroupUnloaded");
          }
        }
      }
    }

    _trigger(method) {
      this.dispatch(method);
      super._trigger(self.C3[AddonTypeMap[addonType]][id].Cnds[method]);
    }

    on(tag, callback, options) {
      if (!this.events[tag]) {
        this.events[tag] = [];
      }
      this.events[tag].push({ callback, options });
    }

    off(tag, callback) {
      if (this.events[tag]) {
        this.events[tag] = this.events[tag].filter(
          (event) => event.callback !== callback
        );
      }
    }

    dispatch(tag) {
      if (this.events[tag]) {
        this.events[tag].forEach((event) => {
          if (event.options && event.options.params) {
            const fn = self.C3[AddonTypeMap[addonType]][id].Cnds[tag];
            if (fn && !fn.call(this, ...event.options.params)) {
              return;
            }
          }
          event.callback();
          if (event.options && event.options.once) {
            this.off(tag, event.callback);
          }
        });
      }
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    _loadFromJson(o) {
      // load state for savegames
    }
  };
}

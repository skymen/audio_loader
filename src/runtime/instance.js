import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  if (self.C3.Plugins.Audio.Instance) {
    self.C3.Plugins.Audio.Instance = class extends (
      self.C3.Plugins.Audio.Instance
    ) {
      constructor(...args) {
        super(...args);
        globalThis.__skymen_audio_instance = this;
      }
    };
  } else {
    alert("This plugin requires the Audio addon to be added to the project");
  }
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();
      if (properties) {
      }
      this.groups = new Map();
      this.loadedAudio = new Set();
      this.loadedGroups = new Set();
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

    async _updateLoadedAudioStatus(audio, loaded) {
      if (!audio) return;
      let curLoadedStatus = this.loadedAudio.has(audio);
      if (curLoadedStatus === loaded) return;
      if (loaded) {
        this.loadedAudio.add(audio);
      } else {
        this.loadedAudio.delete(audio);
      }

      if (loaded) {
        this._lastLoadedAudio = audio;
        this._trigger("OnAudioLoaded");
        this._trigger("OnAnyAudioLoaded");
      } else {
        this._lastUnloadedAudio = audio;
        this._trigger("OnAudioUnloaded");
        this._trigger("OnAnyAudioUnloaded");
      }

      for (const groupName of this.groups.keys()) {
        const group = this.groups.get(groupName);
        if (group.has(audio)) {
          if (loaded && !this.loadedGroups.has(groupName)) {
            for (const audio of group) {
              if (!this.loadedAudio.has(audio)) {
                return;
              }
            }
            this.loadedGroups.add(groupName);
            this._lastLoadedGroup = groupName;
            this._trigger("OnGroupLoaded");
            this._trigger("OnAnyGroupLoaded");
          } else if (!loaded && this.loadedGroups.has(groupName)) {
            for (const audio of group) {
              if (this.loadedAudio.has(audio)) {
                return;
              }
            }
            this.loadedGroups.delete(groupName);
            this._lastUnloadedGroup = groupName;
            this._trigger("OnGroupUnloaded");
            this._trigger("OnAnyGroupUnloaded");
          }
        }
      }
    }

    _trigger(method) {
      this.dispatch(method);
      super._trigger(self.C3[AddonTypeMap[addonType]][id].Cnds[method]);
    }

    on(tag, callback, options) {
      this.events = this.events || {};
      if (!this.events[tag]) {
        this.events[tag] = [];
      }
      this.events[tag].push({ callback, options });
    }

    off(tag, callback) {
      this.events = this.events || {};
      if (this.events[tag]) {
        this.events[tag] = this.events[tag].filter(
          (event) => event.callback !== callback
        );
      }
    }

    dispatch(tag) {
      this.events = this.events || {};
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

export default function (parentClass) {
  self.C3Html5AudioBuffer = class extends self.C3Html5AudioBuffer {
    constructor(...args) {
      super(...args);
    }
    Load() {
      return super.Load().then(() => {
        self.audioLoaderDomInstance.PostToRuntime(
          "update-audio-loaded-status",
          [this.GetUrl(), true]
        );
      });
    }
  };

  self.C3WebAudioBuffer = class extends self.C3WebAudioBuffer {
    constructor(...args) {
      super(...args);
    }
    Load() {
      return super.Load().then(() => {
        self.audioLoaderDomInstance.PostToRuntime(
          "update-audio-loaded-status",
          [this.GetUrl(), true]
        );
      });
    }
  };

  return class extends parentClass {
    constructor(iRuntime) {
      super(iRuntime);
      self.audioLoaderDomInstance = this;
      this.AddRuntimeMessageHandlers([
        ["load", (config) => this.PreInit(config)],
        [
          "unload",
          ([path, preload, nonBlocking, name, url]) =>
            this.PreInitLoadBank(path, preload, nonBlocking, name, url),
        ],
      ]);
    }
  };
}

import { action, condition, expression } from "../template/aceDefine.js";

const category_group = "Group";
const category_load = "Load";

// action(
//   category,
//   "SampleAction",
//   {
//     highlight: false,
//     deprecated: false,
//     isAsync: false,
//     listName: "Sample Action",
//     displayText: "Sample Action {0}",
//     description: "This is a sample action",
//     params: [
//       {
//         id: "param1",
//         name: "Param1",
//         desc: "This is a sample param",
//         type: "string",
//         initialValue: '"Hello World"',
//       },
//     ],
//   },
//   function (param) {
//     console.log(param);
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Sample Action");
//         resolve();
//       }, 1000);
//     });
//   }
// );

action(
  category_group,
  "AddAudioFileToGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Add audio file to group",
    displayText: "Add {0} to group {1}",
    description: "Add an audio file to a group",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
      {
        id: "group",
        name: "Group",
        desc: "Target group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  function (file, group) {
    if (!this.groups.has(group)) {
      this.groups.set(group, new Set());
    }
    this.groups.get(group).add(file);
  }
);

action(
  category_group,
  "RemoveAudioFileFromGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Remove audio file from group",
    displayText: "Remove {0} from group {1}",
    description: "Remove an audio file from a group",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
      {
        id: "group",
        name: "Group",
        desc: "Target group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  function (file, group) {
    const files = this.groups.get(group);
    if (!files) return;
    files.delete(file);
    if (files.size === 0) this.groups.delete(group);
  }
);

action(
  category_load,
  "LoadAudio",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Load Audio",
    displayText: "Load audio {0}",
    description: "Load a single audio file",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
    ],
  },
  async function (file) {
    let audioFile =
      globalThis.__skymen_audio_instance._runtime._assetManager._audioFiles.get(
        file
      );
    if (!audioFile) return;

    await globalThis.__skymen_audio_instance.CallAction(
      C3.Plugins.Audio.Acts.PreloadByName,
      audioFile.isMusic ? 1 : 0,
      audioFile.fileName
    );
  }
);

action(
  category_load,
  "UnloadAudio",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Unload Audio",
    displayText: "Unload audio {0}",
    description: "Unload a single audio file",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
    ],
  },
  async function (file) {
    let audioFile =
      globalThis.__skymen_audio_instance._runtime._assetManager._audioFiles.get(
        file
      );
    if (!audioFile) return;
    await globalThis.__skymen_audio_instance.CallAction(
      C3.Plugins.Audio.Acts.UnloadAudioByName,
      audioFile.isMusic ? 1 : 0,
      audioFile.fileName
    );
  }
);

action(
  category_load,
  "LoadGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Load Group",
    displayText: "Load group {0}",
    description: "Load all audio files in a group",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  async function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return;
    await Promise.all([...files].map((file) => this.LoadAudio(file)));
  }
);

action(
  category_load,
  "UnloadGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Unload Group",
    displayText: "Unload group {0}",
    description: "Unload all audio files in a group",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  async function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return;
    await Promise.all([...files].map((file) => this.UnloadAudio(file)));
  }
);

// condition(
//   category,
//   "SampleCondition",
//   {
//     highlight: false,
//     deprecated: false,
//     listName: "Sample Condition",
//     displayText: "Sample Condition",
//     description: "This is a sample condition",
//     params: [],
//   },
//   function () {
//     console.log("Sample Condition");
//     return true;
//   }
// );

// expression(
//   category,
//   "SampleExpression",
//   {
//     highlight: false,
//     deprecated: false,
//     returnType: "string",
//     description: "This is a sample expression",
//     params: [],
//   },
//   function () {
//     console.log("Sample Expression");
//     return "Sample Expression";
//   },
//   false
// );

condition(
  category_load,
  "IsAudioLoaded",
  {
    highlight: false,
    deprecated: false,
    listName: "Is Audio Loaded",
    displayText: "Is audio {0} loaded",
    description: "Check if a specific audio file is loaded",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
    ],
  },
  function (file) {
    return this.loadedAudio.has(file);
  }
);

condition(
  category_load,
  "IsGroupLoaded",
  {
    highlight: false,
    deprecated: false,
    listName: "Is Group Loaded",
    displayText: "Is group {0} loaded",
    description: "Check if all files in a group are loaded",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return false;
    for (const file of files) if (!this.IsAudioLoaded(file)) return false;
    return true;
  }
);

expression(
  category_load,
  "GroupLoadPercent",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the load percentage for a group (0-100)",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
      },
    ],
  },
  function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return 0;
    let loaded = 0;
    for (const file of files) if (this.IsAudioLoaded(file)) loaded++;
    return Math.round((loaded / files.size) * 100);
  },
  false
);

condition(
  category_load,
  "OnAudioLoaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Audio Loaded",
    displayText: "On audio {0} loaded",
    description: "Triggered when an audio file is loaded",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
    ],
  },
  function (file) {
    return file === this._lastLoadedAudio;
  }
);

condition(
  category_load,
  "OnAudioUnloaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Audio Unloaded",
    displayText: "On audio {0} unloaded",
    description: "Triggered when an audio file is unloaded",
    params: [
      {
        id: "file",
        name: "File",
        desc: "Audio file identifier",
        type: "string",
        autocompleteId: "audioFile",
        initialValue: "",
      },
    ],
  },
  function (file) {
    return file === this._lastLoadedAudio;
  }
);

condition(
  category_load,
  "OnGroupLoaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Group Loaded",
    displayText: "On group {0} loaded",
    description: "Triggered when all files in a group are loaded",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  function (group) {
    return group === this._lastLoadedGroup;
  }
);

condition(
  category_load,
  "OnGroupUnloaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Group Unloaded",
    displayText: "On group {0} unloaded",
    description: "Triggered when all files in a group are unloaded",
    params: [
      {
        id: "group",
        name: "Group",
        desc: "Group name",
        type: "string",
        autocompleteId: "group",
        initialValue: "",
      },
    ],
  },
  function (group) {
    return group === this._lastUnloadedGroup;
  }
);

condition(
  category_load,
  "OnAnyGroupLoaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Any Group Loaded",
    displayText: "On any group loaded",
    description: "Triggered when any group is loaded",
    params: [],
  },
  function () {
    return true;
  }
);

condition(
  category_load,
  "OnAnyGroupUnloaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Any Group Unloaded",
    displayText: "On any group unloaded",
    description: "Triggered when any group is unloaded",
    params: [],
  },
  function () {
    return true;
  }
);

condition(
  category_load,
  "OnAnyAudioLoaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Any Audio Loaded",
    displayText: "On any audio loaded",
    description: "Triggered when any audio file is loaded",
    params: [],
  },
  function () {
    return true;
  }
);

condition(
  category_load,
  "OnAnyAudioUnloaded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On Any Audio Unloaded",
    displayText: "On any audio unloaded",
    description: "Triggered when any audio file is unloaded",
    params: [],
  },
  function () {
    return true;
  }
);

expression(
  category_load,
  "LastUnloadedGroup",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the name of the last group that was unloaded",
    params: [],
  },
  function () {
    return this._lastUnloadedGroup || "";
  },
  false
);

expression(
  category_load,
  "LastLoadedGroup",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the name of the last group that was loaded",
    params: [],
  },
  function () {
    return this._lastLoadedGroup || "";
  },
  false
);

expression(
  category_load,
  "LastUnloadedAudio",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the name of the last audio file that was unloaded",
    params: [],
  },
  function () {
    return this._lastUnloadedAudio || "";
  },
  false
);

expression(
  category_load,
  "LastLoadedAudio",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the name of the last audio file that was loaded",
    params: [],
  },
  function () {
    return this._lastLoadedAudio || "";
  },
  false
);

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
  "LoadFile",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Load File",
    displayText: "Load file {0}",
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
  function (file) {}
);

action(
  category_load,
  "UnloadFile",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Unload File",
    displayText: "Unload file {0}",
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
  function (file) {}
);

action(
  category_load,
  "LoadGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
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
  function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return;
    for (const file of files) this.LoadFile(file);
  }
);

action(
  category_load,
  "UnloadGroup",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
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
  function (group) {
    const files = this.groups.get(group);
    if (!files || files.size === 0) return;
    for (const file of files) this.UnloadFile(file);
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
  "IsFileLoaded",
  {
    highlight: false,
    deprecated: false,
    listName: "Is File Loaded",
    displayText: "Is file {0} loaded",
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
    return true;
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
    for (const file of files) if (!this.IsFileLoaded(file)) return false;
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
    for (const file of files) if (this.IsFileLoaded(file)) loaded++;
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

<img src="./examples/cover.png" width="150" /><br>
# Audio Loader
<i>An extension to the audio addon to better manage audio loading and unloading</i> <br>
### Version 1.0.0.7

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/audio_loader/releases/download/audio_loader-1.0.0.7.c3addon/audio_loader-1.0.0.7.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/audio_loader/releases) </sub> <br>

---
<b><u>Author:</u></b> skymen <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files
| Description | Download |
| --- | --- |

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Add audio file to group | Add an audio file or glob pattern to a group | File             *(string)* <br>Group             *(string)* <br> |
| Remove audio file from group | Remove an audio file from a group | File             *(string)* <br>Group             *(string)* <br> |
| Load Audio | Load a single audio file | File             *(string)* <br> |
| Load Group | Load all audio files in a group | Group             *(string)* <br> |
| Unload Audio | Unload a single audio file | File             *(string)* <br> |
| Unload Group | Unload all audio files in a group | Group             *(string)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is Audio Loaded | Check if a specific audio file is loaded | File *(string)* <br> |
| Is Group Loaded | Check if all files in a group are loaded | Group *(string)* <br> |
| On Any Audio Loaded | Triggered when any audio file is loaded |  |
| On Any Audio Unloaded | Triggered when any audio file is unloaded |  |
| On Any Group Loaded | Triggered when any group is loaded |  |
| On Any Group Unloaded | Triggered when any group is unloaded |  |
| On Audio Loaded | Triggered when an audio file is loaded | File *(string)* <br> |
| On Audio Unloaded | Triggered when an audio file is unloaded | File *(string)* <br> |
| On Group Loaded | Triggered when all files in a group are loaded | Group *(string)* <br> |
| On Group Unloaded | Triggered when all files in a group are unloaded | Group *(string)* <br> |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| GroupLoadPercent | Returns the load percentage for a group (0-100) | number | Group *(string)* <br> | 
| LastLoadedAudio | Returns the name of the last audio file that was loaded | string |  | 
| LastLoadedGroup | Returns the name of the last group that was loaded | string |  | 
| LastUnloadedAudio | Returns the name of the last audio file that was unloaded | string |  | 
| LastUnloadedGroup | Returns the name of the last group that was unloaded | string |  | 

# Stratagamer
"Stratagamer" - it's software which working like a macros programms (Razer Synapse, AHK, etc.) for call stratagems as fast as possible.
Designed and developed especially for Helldivers 2 on PC platform (Windows), with android app and web version for iOS. 

## Run prerequsites

BY DEFAULT USED ARROWS MAPPING IF "remapKeys":false,

1. Check stratagem key mapping in config/config.json
2. Check network connection on mobile device. pc and mobile working only in one network
3. Run stratagamerServer.exe as Admin
4. Run server after you run game
5. Recomendation: change key mapping in game for stratagems on arrows and rightcontrol

## Manual update stratagems

- Download **config/hd2supply.json**
- Download **data** folder or concrete picture

## Platforms

Android - Stratagamer.apk
IOS - use {host:port}/webapp

## Config description

```
"port":"3030", // port for server
"suppliesFile":"hd2supply.json", // stratagems combination files
"stratagemKeyCode":"rctrl", // main button for active stratagem menu, keymapping see below
"gameWindowTitle":"HELLDIVERS™ 2", //dont change this
"cloudGaming":0, // 0 - disable, 1 - variant #1, 2 - variant #2, 3 - variant #3, 4 - variant #4 worked for VK Play Cloud (50% some variant will works for you)
"minDelay":30, // min delay between press (only for auto mode)
"maxDelay":50, // max delay between press (only for auto mode)
"remapKeys":false, // enable or disable direct virtual key input, if false, server map keys directly from suppliesFile stratagem sequence 
"stratagemUP":"up", // depends on mapStratagemKeys = true, 
"stratagemDOWN":"down", // depends on mapStratagemKeys = true
"stratagemLEFT":"left", // depends on mapStratagemKeys = true
"stratagemRIGHT":"right" // depends on mapStratagemKeys = true
```
## Author recomendation key mapping

- stratagem menu - right control
- stratagem up - arrow up
- stratagem down - arrow down
- stratagem left - arrow left
- stratagem right - arrow right

## Example
- "sequence": ["right","up","down","down","right"]
- "remapKeys":true
- "stratagemUP":"W"
- "stratagemDOWN":"S"
- "stratagemLEFT":"A"
- "stratagemRIGHT":"D"
- Real eexecuted sequence is ["D","W","S","S","D"]

## Key mapping
```
	"tab" = VK_TAB
	"enter" = VK_ENTER
	"esc" = VK_ESC
	"backspace" = VK_BACKSPACE
	"space" = VK_SPACE
	"volumeup" = VK_VOLUME_UP
	"volumedown" = VK_VOLUME_DOWN
	"volumemute" = VK_VOLUME_MUTE
	"shift" = VK_SHIFT
	"lshift" = VK_LSHIFT
	"rshift" = VK_RSHIFT
	"ctrl" = VK_CONTROL
	"lctrl" = VK_LCONTROL
	"rctrl" = VK_RCONTROL
	"lalt" = VK_LMENU
	"ralt" = VK_RMENU
	"lwin" = VK_LWIN
	"rwin" = VK_RWIN
	"left" = VK_LEFT
	"up" = VK_UP
	"right" = VK_RIGHT
	"down" = VK_DOWN
	"numlock" = VK_NUMLOCK
	"nexttrack" = VK_MEDIA_NEXT_TRACK
	"prevtrack" = VK_MEDIA_PREV_TRACK
	"mediastop" = VK_MEDIA_STOP
	"playpause" = VK_MEDIA_PLAY_PAUSE

	"num0" = VK_NUMPAD0
	"num1" = VK_NUMPAD1
	"num2" = VK_NUMPAD2
	"num3" = VK_NUMPAD3
	"num4" = VK_NUMPAD4
	"num5" = VK_NUMPAD5
	"num6" = VK_NUMPAD6
	"num7" = VK_NUMPAD7
	"num8" = VK_NUMPAD8
	"num9" = VK_NUMPAD9
	"nummult" = VK_NUMPADMULTIPLY
	"numplus" = VK_NUMPADPLUS
	"numsep" = VK_NUMPADSEPARATOR 
	"numminus" = VK_NUMPADMINUS 
	"numdot" = VK_NUMPADDOT
	"numdiv" = VK_NUMPADDIV
	"numenter" = VK_NUMPADENTER
	"insert" = VK_INSERT
	"end" = VK_END
	"home" = VK_HOME
	"pagedown" = VK_PAGEDOWN
	"pageup"= VK_PAGEUP


	"F1" = VK_F1
	"F2" = VK_F2
	"F3" = VK_F3
	"F4" = VK_F4
	"F5" = VK_F5
	"F6" = VK_F6
	"F7" = VK_F7
	"F8" = VK_F8
	"F9" = VK_F9
	"F10" = VK_F10
	"F11" = VK_F11
	"F12" = VK_F12
	"1" = VK_1
	"2" = VK_2
	"3" = VK_3
	"4" = VK_4
	"5" = VK_5
	"6" = VK_6
	"7" = VK_7
	"8" = VK_8
	"9" = VK_9
	"0" = VK_0
	"Q" = VK_Q
	"W" = VK_W
	"E" = VK_E
	"R" = VK_R
	"T" = VK_T
	"Y" = VK_Y
	"U" = VK_U
	"I" = VK_I
	"O" = VK_O
	"P" = VK_P
	"A" = VK_A
	"S" = VK_S
	"D" = VK_D
	"F" = VK_F
	"G" = VK_G
	"H" = VK_H
	"J" = VK_J
	"K" = VK_K
	"L" = VK_L
	"Z" = VK_Z
	"X" = VK_X
	"C" = VK_C
	"V" = VK_V
	"B" = VK_B
	"N" = VK_N
	"M" = VK_M
```


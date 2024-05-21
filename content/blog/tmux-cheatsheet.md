---
title: 'Tmux Cheatsheet'
description: "Usefull keybinds I learned while using tmux.."
date: 2024-05-21T03:09:49+02:00
tags: 
    - "tmux"
draft: false
---

## What is tmux?
According to the [tmux](https://github.com/tmux/tmux/wiki) on their wiki:
> tmux is a terminal multiplexer. It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.

## Keybinds
The default keybind for tmux is `CTRL+B`.

### Sessions
- `tmux [new -s <session-name>]`: Create a new session (with a name)
- `tmux ls`: List all sessions
- `tmux a[ttach] [-t <session-name>]`: Attach to a session (by name)
- `tmux kill-sess[ion] [-t <session-name>]`: Kill a session (by name), if no name is provided, it will kill the most recent session
- `tmux kill-sess[ion] -a`: Kill all sessions

When in a sessin you can use `CTRL+B d` to detach from the session.

### Windows
When you're in a session:
- `CTRL+B c`: Create a new window
- `CTRL+B n`: Go to the next window
- `CTRL+B p`: Go to the previous window
- `CTRL+B <window-number>`: Go to a specific window
- `CTRL+B ,`: Rename the current window
- `CTRL+B w`: List all windows (use arrow keys and enter),
- `CTRL+B &`: Close the current window

### Panes
When you're in a window:
- `CTRL+B %`: Split the current pane vertically
- `CTRL+B "`: Split the current pane horizontally
- `CTRL+B <arrow-key>`: Go to the pane in the direction of the arrow key
- `CTRL+B o`: Go to the next pane
- `CTRL+B x`: Close the current pane
- `CTRL+B z`: Max/minimize the current pane
- `CTRL+B !`: Move the current pane to a new window
- `CTRL+B {`: Move the current pane to the left
- `CTRL+B }`: Move the current pane to the right
- `CTRL+B q`: Show pane numbers (use the number to go to that pane)
- `CTRL+B space`: Cycle through pane layouts
- `CTRL+B ;`: Toggle between the current and previous pane
- `CTRL+B CTRL+<arrow-key>`: Resize the pane in the direction of the arrow key
- `CTRL+B [`: Enter copy mode, "q" to exit

## Conclusion
The shortcuts listed above are the ones I mostly use. It might feel daunting at first, I recommend using it with a list like this on your second monitor, the 
shortcuts are pretty intuitive so you'll get the hang of it in no time. 

---
title: "command-line text editor learnings"
---
# What I learned while making a command-line text editor from scratch in C?
![[blogs/Pasted image 20220828185654.png]]

Ordinarily, I do not create such low-level projects, but as I was getting more inclined towards systems-programming I had to do something to get my feet wet in this domain. And while creating this project, I got mesmerized by the level of detail which I had to take care of while implementing every feature. Also, I got to know why C is harassed for memory management.

This text editor works just like the legendry nano text editor.

I'll articulate my learnings while explaining how this text editor works.


## Taking input from the keyboard

### read()
I've used `read()` system call which is available under `<unistd.h>` . `read()` gives us fine-grained control over taking input as we need to specify the file descriptor and the number of bytes.

### Timeout for read
`read()` is a blocking system call which means it will wait indefinitely for input to be taken, therefore it may have poor performance implications.
So, we'll add a time out for read by setting terminal attributes `VMIN` and `VTIME` to 0 and 1, which means read returns as soon as there is any input and timeouts every 1/10th of a second.

**Syntax: `size_t read (int fileDescriptor, void* buffer, size_t noFoBytes)`**

### Canonical Mode vs Raw Mode
As we'll be entirely working with the terminal, we need to dive into the little details.
By default, the terminal comes in **canonical mode,** which means the keyboard input only gets to the program after we press enter.
To take everything into our hands we'll need to enter **raw mode**.
Entering raw mode is not as easy as pressing a switch, we'll need to change a couple of terminal attributes such as:

1.  **Turn off echoing** which means we'll turn off the terminal's default way of rendering text onto the screen.
2.  **Disable Ctrl-C and Ctrl-Z signals** as we do not want to kill or suspend our editor without gracefully handling everything.
3.  **Disable Ctrl-S and Ctrl-Q signals** Ctrl-S stops data from being transmitted into the terminal until you press Ctrl-Q
4.  **Disable Ctrl-V** Ctrl-V lets you take a character literally which means it allows us to embed a control character. We'll discuss control characters later.
5.  **Fix Ctrl-M** Ctrl-M is the control character for carriage-return("\r") but our terminal adds a newline after it.
6.  **Turn off output processing** By default terminal adds carriage-return after newline("\n"). We'll discuss carriage return later.

Terminal attributes can be read by `tcgetattr()` into `termios` struct and set by `tcsetattr()`.

**Carriage Return('\\r')** brings cursor to the extreme left and **Newline('\\n')** brings the cursor to the next line at the same position where it was in the previous line.

## Handling Errors
We use `perror()` to handle errors as it looks at the global `errno` and prints a descriptive error message. It also prints the string given to it, before printing the error message.

## How do we map Ctrl + alphabetic keys?
**Control Characters** are non-printing characters that are utilized to serve a purpose.

q has a binary ASCII value of `01010001` and CTRL-q has `10001`. If you'll try to observe you'll realize that bits after 5th bit are stripped. Well, ASCII values are designed in this way on purpose.
Now, we know how things work so create a bit-mask to do the same and apply it to the alphabetic keys.

## Outputting to the screen
### write()
`write()` is a system call that takes the file descriptor and number of bytes.
**Syntax:** `size_t write (int fileDescriptor, void* buffer, size_t numberOfBytes);`

### Escape Sequences
These are special character sequences that instruct the terminal to do various tasks such as text formatting, moving the cursor, and clearing the screen. We'll use **ANSI** escape sequences which start with `'\x1b'` which in itself translates to escape key, followed by a [.

**`<esc>[2J` clears the entire screen.**
`0` clears from the cursor to the end of the screen.
`1` clears the screen up to the position of the cursor.

**`<esc>[H` positions the cursor to top left.**
`<esc>[5;7H` will position the cursor to the specified row and col number.

### Window Size
I used `ioctl()` to get window size and, I also had to implement a fallback method if ioctl() failed to work for some reason.
Another way we can get the window size is by pushing the cursor bottom-right as far as possible without going out of bounds by using this escape sequence `"\x1b[999C\x1b[999B"` and and then query the position of the cursor by using `"\x1b[6n"`.

### Screen Refresh
After every keypress, we refresh the screen. To refresh the screen we clear one line at a time using `""\x1b[K""` and then append the same/modified line data.

---
There's a lot more to tell, but it'll need more context to explain. So this is it.

If you enjoyed reading this you'll enjoy x100 [creating](https://viewsourcecode.org/snaptoken/kilo/) it.

Check out my [editor](https://github.com/aryanA101a/nin). It works on Linux and may work on Mac OS.
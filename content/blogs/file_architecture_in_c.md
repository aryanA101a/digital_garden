---
title: "File Architecture in C"
---
# Cleaning C code to maintain sanity
![[img/cc.jpeg]]

I, am the kind of person who can ignore scattered and untidy surroundings, but when it comes to messy code, I cannot resist cleaning and refactoring it.
I am writing this blog after refactoring a monolith of 1000 lines.

Let's get started.

Suppose we've built a Random Coordinates Generator in C. If we put all our code in a single file, it'll look like this.
![[img/mono.svg]]
Output:
![[img/mono_output.svg]]

The code is quite self-explanatory, just give it a read you'll get the idea of what's going on.

## Refactoring Begins
To get started on refactoring, firstly, we'll seperate the code in  `.c` and header `.h`  files, adding **function signature/declaration** in `.h` file and **function defination** in `.c` file.

**Header File** is a file that contains function declarations and macro definitions.

Now, the question is, Why header files? Why not only separate `.c` files?
**Abstractionnn...**
To create reliable and robust code bases, we need to follow some principles, one of which is an abstraction. 

After refactoring, our file tree will look like this:
![[img/ft.svg|400]]
![[img/h1.svg|450]]![[img/c1.svg|450]]
`coordinate.h` file doesn't know the implementation details of the declared functions.
![[img/h2.svg|450]]![[img/c2.svg|450]]
`random_coordinates.c` uses functions from `coordinate.h` but does not know its implementation details.

![[img/m.svg|500]]
Look how clean is our `main()` function now.
Our `main.c` file also does not know the implementation of `print_random_coordinates()` as only the header file is included.

Now, comes the question: `coordinate.c` and `random_coordinates.c` are not included anywhere, so how come our program gets to know the implementation?
During compilation, we link both the required `.c` files with the `main.c` file.
`gcc main.c coordinate.c random_coordinates.c -o main`

Hiding implementation makes the code more maintainable and less dependent.

A couple of lines of code that start with `#ifndef FILENAME` may be causing you an itch in the brain. Those are known as **"include guards"**.

## Why and How to use "INCLUDE Guards"?
Suppose we have two headers and the `first.h` includes `second.h` and the `main.c` include both `first.h` and `second.h` Now, this will cause the `main.c` to have a double implementation of the functions in `second.h`.
To avoid this, we use "include guards":

Usage:
```C
#ifndef UNIQUE_NAME
#define UNIQUE_NAME

function_signature()

#endif
```

These macros do the following:
If UNIQUE_NAME is not defined before then,
define UNIQUE_NAME and include the header

If this header is included for second time in the same scope, then the `#ifndef` condition is not satisfied, and the lines after `#ifndef` are not read as `#endif` is executed just after `#ifndef`.

Check out my github [repo](https://github.com/aryanA101a/clean_c_code_template) for this code.
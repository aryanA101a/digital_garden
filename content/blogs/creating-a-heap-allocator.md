---
title: "From Concept to Reality: Crafting an ImplicitList Heap Allocator"
---

![[blogs/Heap Allocator.png]]

Before getting started we need to take a pause and think about what is a heap allocator. What does it do? 
A heap allocator is a program that manages the memory(ram) required by the processes or user programs at the run-time. You must be thinking about what exactly happens under this management. It talks with the kernel to request memory from the system. Now, this requested memory comes as a contiguous chunk after the previous allocation and the heap allocator has to somehow divide it into pieces and create metadata on it to store and delete the chunks requested by the user or a process.
Heap allocators are of two types:
- Implicit Heap Allocators: These are also known as Garbage Collectors. In modern high-level languages such as Go, dart, java, etc, gc does the heavy lifting of memory management.
- Explicit Heap Allocators: This type of allocator supports memory allocation, extension and deallocation requests. In languages such as C, memory management has to be done manually.

### Why should we care?
We can choose not to, but I'm sure you're curious about what happens under the hood and would like to clear out this abstraction of how manual memory management happens under the hood by implementing a basic heap allocator. 
**Note** This project is only an exercise to take our minds to newer heights, in no way we are creating an allocator that can be used in the realworld. 

## Concepts
To create our little heap allocator we'll need to understand some nitty-gritty details of what happens behind the scenes and explore some issues.
**Note**- the concepts explained below are not in their entirety, but enough for us to get started in our journey. To get a deep understanding of the concepts we've talked about, you can refer to [Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) and [Computer Systems: A Programmer's Perspective](https://csapp.cs.cmu.edu/)

### Paging

In simple words, the operating system chops the ram in equal pieces which are called frames and then maps them with virtual addresses(to provide memory security), these mapped frames are called pages and this whole process is called paging.
If there's a process running, the memory it occupies is not contiguous but is distributed in the form of different pages across the ram. Let's see this in the next concept.

### Process Memory Map

![[blogs/Process Memory.png]]

**Code Segment** - This reigion of process's memory has the code of running program or process in the form of cpu insturctions. It is read only.

**Data Segement** - This reigion of process's memory has global variables, constants, static and local static variables.

**BSS** - This reigion of process's memory has uninitialized global variables, constants, static and local static variables.

**Stack Pointer** - It is a pointer in the stack memory which does all the heavy work of manipulating stack memory.

**Stack** - This region of process's memory has function arguments, local variables and return addresses of functions.It is fast as the process of memory allocation and deallocation is as simple as simple stack pointer manipulation forward and backwards, but the trade off is that we have to know beforehand how much memory will be required.

**Brk** - It is a pointer which points to the end hf heap memory.

**Heap** - This region of memory is our area of concern. This is dynamic memory which can be allocated, extended and deallocated at runtime. In C language this can be done by malloc(), realloc() and free(). These are the APIs we are going to implement.

- **malloc()** is the api which the user can use to dynamically allocate the memory. When it is called, it checks a raw datastructure, that in our case is implicit freelist, for available memory in the heap. If the memory is available it marks the free block of memory it found in the heap and return the pointer to the starting of this block else it calls sbrk() or mmap() to request more pages from the kernel, inturn the kernel extends the newly requested memory after the end of heap,moves the brk pointer to the new end and returns the address of previous brk.
- **realloc()** extends or contracts the previously allocated memory either by joining the previously allocated block to its left or right or both else by finding a new box of appropriate size and then copying the data from the previous block and to the new block and freeing the previous block.
- **free()** as the name suggest it frees the previously allocated block.
We'll talk in more depth in the while implementing them.

### Fragmentation

Fragmentation is an issue in which we are left with unused pieces of memory that cannot be used seprately but together forms a signifacant amoun of memory.

There are two types of fragmentation:
1. **Internal Fragmentation** - This type of fragmentation usually arises due to due to allocator allocating more than requested memory, just to satisfy the alignment criteria.

What is alignment here?
While allocating memory we have to abide by the rule of allocating memory in multiples of a number. This number ususally depends on the architecture of the processor. On 64-bit processors memory is usually 8 byte aligned, which means if requested memory is not in multiple of eight then   the heap allocator rounds the request to the multiple of 8 bytes.

Why is it required?
The maximum memory a processor can fetch in one cycle is the size of its architecture.
Supoose we have a 32 bit processor, it can only fetch 4 bytes in one instruction.
If a user asks wants to store an int and a char, it'd require him to allocate (4 + 1) bytes for this purpose.
Unaligned memory access can cause inefficcient retrival and therefore slowdown in performance, which is why the the data is also stored in a way that the addresses are multiple of the architecture.
**Note -** For scope of this project, we'll be creating a heap allocator for 32bit system which will be 8byte aligned. Why for 32bit system and 8 bit aligned? To keep the complexity at an average and since, we need our allocator to support with 64 bit systems. 

2. **External Fragmentation** - This usually arises when there are varius small free chunks of memory are distributed accross the heap, if aggregated they can satisy an allocation request but there is no single block to satisfy the request.

### Implementation Issues

- **Free Block Organization** - Heap is just raw memory. We can manage the allocation, deallocation, etc request however we want. We need to keep a track of what size block resides where to efficiently accomodate future requests.
- **Placememnt** - How do we choose a new block for allocation?
- **Splitting** - Do we split the block if the requested allocation is smaller than the available block?
- **Coalesce** - Do we join the free blocks to get bigger blocks? If yes should we do it before allocating or after freeing a block?

### Finding Blocks

Now suppose we have a linear list of allocated and free blocks. How do we go about them and find the block of requred size?

- **First fit** searches the free list from the beginning and chooses the first free
block that fits.
- **Next fit** is similar to first fit, but instead of starting each search at
the beginning of the list, it starts each search where the previous search left off.
- **Best fit** examines every free block and chooses the free block with the smallest size
that fits.

### Implicit Free List

This is the raw data structre that will power our heap allocator. Each block is of 4 bytes. Now to keep the track of allocations and deallocations, we need to store some metadata along each block on the list. For this we'll attach a header and a footer to each block. The footer will be the copy of the header. A block looks like this:

![[blogs/Block_2.png]]

**Header**
The size of header is 4 bytes. The header stores the size of the block and the allocation status. Since the size of the blocks have to be in multiples of 8, we can use this as our advantage to store more data in the same header. The multiples of 8 have a special property in binary representation. The last three bits are zeros. So we can use the last bit to store allocation status. 1 for allocated and 0 for unallocated.
For example if a block is of size 48 bytes, then the binary representation of its header will be 110000 for the free block and 110001 for allocated block. To read size or allocation status out of this header we can use bit manipulation.

**Payload**
This starts just after the header. This is the place where the data will be stored. If a use allocates some memory then the user gets a pointer to this payload and not the header.

**Padding** happens in the case when we need to maintaing the alignment.

Now coming back to the implicit freelist. It starts with an empty block which is also called a **padding block**. Then, there is a **prologue block** of 8 bytes and allocated status, it only contains an header and a footer. Then, there are the regular blocks. And lastly the implicit freelist ends with **epilogue block** which is only a block of one header which shows size as zero and status as allocated. The blocks other than regular blocks are there to fight off the edge cases.
Image

### Coalescing
it is a process of joining blocks to form a larger block. It is required to combat fragmentation. 
In our implementation of the allocator we'll implement coalescing after we free the block.
How exactly?
After we free the block, we check for free blocks after and behind it, if there are, we join the blocks together to form a larger block.
Here's a depection of how it works:
Image

## Implementation

![[blogs/Brain_2.png]]

Now that we've eaten the brain food we need to create a heap allocator, we can start building it. 
to create our work easier I'll provide you a [template]() from [Stanford's CS107 Assignment 7](https://web.stanford.edu/class/archive/cs/cs107/cs107.1186/assign7/) to jump-start our allocator and test its robustness with all possible loads.
The instructions to get started with these files are there on the assignment pdf.
The files contain a bump allocator, which is a barebones allocator. You need to study the bump allocator and the testharness.c file in order to to get familiar with the template and march forwards for our goal.
Make sure you explore the sample_cp directory and run make to create the executables for testing. 

**Note** - I'm not going throug my implementation in this blog, rather I'll only provide you with wheels and logs and the rest is upto you. I hope you to come up with your own implementation for the sake of your mental exercise. But anyways, I'll provide a link to my implementation at the last. You should refer to my implementation only if you are stuck from more than two days, otherwise keep trying.

Before starting, let me provide you some c macros, to make our work easier and code clean.

```
#define WSIZE 4

#define DSIZE 8

  

#define MAX(x, y) ((x) > (y) ? (x) : (y))

  

/* Pack a size and allocated bit into a word */

#define PACK(size, alloc) ((size) | (alloc))

  

/* Read and write a word at address p */

#define GET(p) (*(unsigned int *)(p))

#define PUT(p, val) (*(unsigned int *)(p) = (val))

  

/* Read the size and allocated fields from address p */

#define GET_SIZE(p) (GET(p) & ~0x7)

#define GET_ALLOC(p) (GET(p) & 0x1)

  

/* Given block ptr bp, compute address of its header and footer */

#define HDRP(bp) ((char *)(bp)-WSIZE)

#define FTRP(bp) ((char *)(bp) + GET_SIZE(HDRP(bp)) - DSIZE)

  

/* Given block ptr bp, compute address of next and previous blocks */

#define NEXT_BLKP(bp) ((char *)(bp) + GET_SIZE(((char *)(bp)-WSIZE)))

#define PREV_BLKP(bp) ((char *)(bp)-GET_SIZE(((char *)(bp)-DSIZE)))

  

#define ALIGNMENT 8
```

These macros are from the [CSAPP](https://csapp.cs.cmu.edu/) book.

As the name suggests the PACK macro packs the size and alllocated status to fill in the content of header.
The GET and PUT macro can be used to retrieve and flush the contents of/to a single block of 4 bytes.
GIven the pointer to the header or footer the GET_ALLOC and GET_SIZE macros retrieves the allocation status and size.
Block Pointer always points to the payload of a block.
HDRP macro will returh the address of the header given the block pointer.

Go through alll the macros, it'll tighten up the concept of implicit freelist and help working with it.

In the implicit.c file there are empty functions, waiting for us to turn our newly grasped knowledge into code.

###  `bool myinit(void *, size_t)`

In this function we'll create and initialize our implicit free list so that we can start taking allocation and deallocation requests.

### `void *mymalloc(size_t sz)`

Malloc returns a pointer to the starting of the payload and returns null if there is no block available.
In reality if there is no block available, then malloc calls **sbrk()** or **mmap()** to request the extention of heap's memory and create more blocks. In the case these system calls fails to extend the heap, malloc returns null.

- Roundup to the required alignment.
- Find fit and place the block.
- To find the block, implement your own first fit or next fit or best fit or all of them.
- Place the block without corrupting the implicit free list.
- Keep in mind you only have to split the block if the found block is bigger than needed size.

After you are satisfied with your implementation, check for accuracy of your implementation by running test_implicit with example and pattern scripts those only checks for allocation requests.
If you encounter any error, make sure your implementation of the implicit freelist in the `myinit()` is inline with the specification discussed above.

### `void myfree(void *)`

Free frees the allocated block and returns nothing, but there is an edgecase which you'll find in the one of the test script.
I'd suggest first implement free without coalesing. Check the correctness of your implementation by testing with free scripts.
**coalesce** is straightforward to implement but there is a chance you'll corrupt the freelist, so work with caution. Be sure to check coalesing too for correctness with the respective test scripts.
If you have done everything correctly than you deserve an Ice Cream, I urge you to gift it to you.

### `void *myrealloc(void *oldptrv, size_t newsz)`

Coming on to the last api, realloc takes the pointer to allcated memory and size, extends or contracts the block according to the request and returns the block pointer.
To extend the size of the previous block we'll first coalesce to satisfy the new size requirement. If even after coalesing we do not get the desired size, we'll then find a new block, dump the data to this new block and then free then old one.
To dump data from one location to other you can use **memcpy()** or **memmove()**. Even though both functions performs the same work but only one of them will satisfy our use case. Read about both of them and choose the appropriate.

- Roundup to the required alignment.
- Accomodate edge cases.
- Implement coalesing.
- Find a new block if coalesing does not work.
- Place the data from the old block to the new one.

Now check the correctness with respective test scripts.

To check for all the scripts at the same time, use this command:
`./test_implicit samples_cp/*.script`

Salute to you for sticking upto this point. I see that you are a curious mind and you like to deep dive into the inner workings of computer science.

Here's the [solution](https://github.com/aryanA101a/henry).
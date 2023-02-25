---
title: "minor-project-II-presentation-content"
---
# Henry: Heap Allocator

### Heap Allocator
An allocator maintains the heap as a collection of various-size blocks. Each
block is a contiguous chunk of virtual memory that is either allocated or free.

Dynamic memory allocators such as malloc can allocate or deallocate heap
memory explicitly by using the `mmap` and `munmap` syscall, or they can use the
`sbrk` syscall.

![[stuff/memory_layout.png]]


---

### Allocators come in two basic styles.

1. **Explicit allocators** require the application to explicitly free any allocated
blocks. For example, the C standard library provides an explicit allocator
called the malloc package. 

2. **Implicit allocators**, on the other hand, require the allocator to detect when
an allocated block is no longer being used by the program and then free
the block. Implicit allocators are also known as **garbage collectors**.
For example, higher-level languages such as Java rely
on garbage collection to free allocated blocks.

---

### Allocator Requirements 

- Handling arbitrary request sequences
- Making immediate responses to requests.
- Aligning blocks (alignment requirement).
- Not modifying allocated blocks.

### Goals

- Maximizing throughput
- Maximizing memory utilization

---

### Fragmentation
The primary cause of poor heap utilization is a phenomenon known as fragmen-
tation

![[stuff/fragmentation.png]]

1. **Internal fragmentation** occurs when an allocated block is larger than the pay-
load.

2. **External fragmentation** occurs when there is enough aggregate free memory
to satisfy an allocate request, but no single free block is large enough to handle
the request.

***Trivia**: The processors in modern 64-bit systems involve a lot of cool techniques to make execute instructions as fast as possible. One of which is **Prefetching**, a technique used in modern processors to improve performance by anticipating memory access patterns and starting to load data into cache before it is actually needed. This is the reason why we need to align memory allocations in the multiples of 16 bytes.*

---

### Implementation Issues

- **Free block organization**. How do we keep track of free blocks?
- **Placement**. How do we choose an appropriate free block in which to place a
newly allocated block?
- **Splitting**. After we place a newly allocated block in some free block, what do
we do with the remainder of the free block?
- **Coalescing**. What do we do with a block that has just been freed?


---

### Implicit Free Lists

![[stuff/implicit-list-heap-block-format.png]]

![[stuff/implicit-list.png]]

---

#### Placing Allocated Blocks

- **First fit** searches the free list from the beginning and chooses the first free
block that fits.
- **Next fit** is similar to first fit, but instead of starting each search at
the beginning of the list, it starts each search where the previous search left off.
- **Best fit** examines every free block and chooses the free block with the smallest size
that fits.

---

### Timeline/Roadmap

**P1**: Knowledge Gathering and Prerequisite Study
**P2**: Complete Prequsite Study & Freelist Implementation
**P3**: Binned Freelist/Segregated Freelist Implementation
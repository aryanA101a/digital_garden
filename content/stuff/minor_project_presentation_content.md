---
title: "minor project presentation"
---

## Villi 

![[stuff/villi 1.png]]


![[stuff/villi_on_bg.png]]

---
## What are we creating?
**A Bit-Torrent Client**

![BitTorrent](https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BitTorrent_logo.svg/1280px-BitTorrent_logo.svg.png)

---
## What is it based on?
**Bit-Torrent Protocol**

![seeder_leecher](https://www.researchgate.net/profile/Minas-Gjoka/publication/228356133/figure/fig1/AS:301986110033920@1449010507254/Typical-operation-of-BitTorrent.png)


---
## How traditional downloading works?
![[stuff/client_server.png]]

A computer requests a file from the **central server**, then it copies the file to itself using **File Transfer Protocol**

---
## What is Bit-Torrent Protocol?

![[stuff/p2p.png]]

BitTorrent is a protocol for downloading and distributing files across the Internet.
Participants in the BitTorrent network, called **peers**, download pieces of files from _each other, this is what makes it a **peer-to-peer** protocol.  

We’ll investigate how this works, and build our own client that can find peers and exchange data between them.

---
## Bit-Torrent Architecture

![](http://lh3.ggpht.com/snehasis.patra/SKYSppLOWUI/AAAAAAAAA5Y/3EbG1WSzBss/bittorrent_BitThief%5B17%5D.png?imgmax=800)

- Tracker
- .torrent file
- Seeder
- Leecher
---
## Tracker

![[stuff/Pasted image 20220923200609.png|500]]

A tracker is a special type of server that keeps track of seeders and leechers and helps efficient transmission and reassembly of the copied file.

---
## .torrent file
It is a metedata file which describes the contents of the the file going to be downloaded and it contains the information about the trackers.
It is encoded in **bencode** format.

It contains tracker url, a comment, creation date, size of file, name, piece size and a binary blob of SHA-1 hashes of each piece.

````
d
  8:announce
    41:http://bttracker.debian.org:6969/announce
  7:comment
    35:"Debian CD from cdimage.debian.org"
  13:creation date
    i1573903810e
  4:info
    d
      6:length
        i351272960e
      4:name
        31:debian-10.2.0-amd64-netinst.iso
      12:piece length
        i262144e
      6:pieces
        26800:�����PS�^�� (binary blob of the hashes of each piece)
````
---
## Seeders

A seeder is that computer in the distributed network who is sharing/uploading the file.

---
## Leecher

A leecher is that computer in the distributed network who is downloading the file.

---
## What will it support?
- Download a file from a distributed network of seeders using a `.torrent` file
- A terminal user interface
 ![tui](https://stuff.charm.sh/bubbletea/bubbletea-example.gif?0)
- [Experimental] Magnet Links
- [Experimental] Seeding mechanism
---
## Learning Objectives
- To get a deep understanding of the inner workings of BitTorrent Protocol

![](https://images.unsplash.com/photo-1583198432859-635beb4e8600?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)

- To understand **multi-threading** by implementing threads in golang.

![](https://jenkov.com/images/java-concurrency/introduction-2.png)

---

## What are we using to create it?

Programming Language: **Go**

![](https://i0.wp.com/meritocracy.is/blog/wp-content/uploads/2021/04/golang.jpg?fit=1280%2C710&ssl=1)

UI Framework: **BubbleTea**

![](https://repository-images.githubusercontent.com/233130089/90d82180-07c4-11eb-873b-5a3d57eb0517)

---
title: "bittorrent"
---
### Tracker
A tracker is a special type of server that keeps track of seeders and leechers and helps efficient transmission and reassembly of the coppied file.

### .torrent file
It is a metedata file which describes the contents of the the file going to be downloaded and it contains the information about the trackers.
It is encoded in **bencode** format.

It contains tracker url, a comment, creation date, size of file, name, piece size and a binary blob of SHA-1 hashes of each piece.

eg:
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

### Bencode
Bencode is an encoding format used by bittorrent for storing loosely structured data.
It can store strings,lists,integers and dictionaries. It can efficiently handle binary data.

**string:** `5:villi` 'villi'

**integer:** `i45e` 45

**list:** 
```
l
	5:villi
	i45e
e
```
['villi',45]

dictionary:** 
```
d
	5:villi
	i45e
e
```
{'villi':45}



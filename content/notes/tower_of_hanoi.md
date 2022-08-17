---
title: "Tower of Hanoi"
---
```
long long c=0;
void solve(int N, int from, int to, int aux,long long &c) {
    c++;
    if(N==1){
        cout<<"move disk "<<N<<" from rod "<<from<<" to rod "<<to<<endl;
        return;
    }
    toh(N-1,from,aux,to);//n-1 disks ko rod 1 se 2 pe, kyuki nth waali sabse badi disk hai, uske liye 3rd rod chordenge
    cout<<"move disk "<<N<<" from rod "<<from<<" to rod "<<to<<endl;//nth disk ko 1 se 3 par
    toh(N-1,aux,to,from);//n-1 disks ko 2 se 3 
}
    
long long toh(int N, int from, int to, int aux) {
    solve(N,from,to,aux,c);
    return c;
}
```
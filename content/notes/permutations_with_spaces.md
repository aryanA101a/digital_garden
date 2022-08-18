---
title: "permutations with spaces"
---

### Question: https://practice.geeksforgeeks.org/problems/permutation-with-spaces3627/1

![[notes/images/permutation_with_spaces.excalidraw.svg]]

```c++
void solve(string ip,string op,vector<string>& res){
    if(ip.length()==0){
        res.push_back(op);
        return;
    }
    
    string op1=op;
    string op2=op;
    
    op1.push_back(' ');
    op1.push_back(ip[0]);
    op2.push_back(ip[0]);
    
    ip.erase(ip.begin()+0);
    
    solve(ip,op1,res);
    solve(ip,op2,res);
}

vector<string> permutation(string S){
    vector<string> res;
       
    string op="";
    string ip=S;
        
    op.push_back(ip[0]);
    ip.erase(ip.begin()+0);        
    solve(ip,op,res);
        
    return res;
}
```
---
title: "Delete middle element of a stack"
---

```
	void solve(stack<int>&s, int mid){
        if(s.size()==mid){
            s.pop();
            return;
        }
        int temp=s.top();
        s.pop();
        solve(s,mid);
        s.push(temp);
    }
    
    void deleteMid(stack<int>&s, int sizeOfStack)
    {
        
        int mid=((sizeOfStack+1)/2);
        solve(s,mid);
        
    }
```
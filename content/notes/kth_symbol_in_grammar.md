---
title: "Kth symbol in grammar"
---

### Question: https://leetcode.com/problems/k-th-symbol-in-grammar/

### Given
n\k | 1 2 3 4 5 6 7 8
-- | --------
**1** | 0
**2** | 0 1
**3** | 0 1 1 0
**4** | 0 1 1 0 1 0 0 1

### Observation
We can observe that:
- no of K's = 2$^{n-1}$
- for k<=mid : qth(n,k)=qth(n-1,k)
- for k>mid : qth(n,k)= complement of qth(n-1,k-mid)


## Code
```
    int kthGrammar(int n, int k) {
        if(n==1&&k==1){
            return 0;
        }
        int mid=pow(2,n-1)/2;
        
        if(k<=mid){
            return kthGrammar(n-1,k);
        }else{
            return !kthGrammar(n-1,k-mid);
        }
    }
```


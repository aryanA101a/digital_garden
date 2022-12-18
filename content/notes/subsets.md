---
title: "Subsets"
---
![[img/ip_op_example.excalidraw.svg]]
```
void solve(vector<int> ip,vector<int> op,vector<vector<int>>& res){
        
    if(ip.empty()){
        res.push_back(op);
        return;
    }
        
    vector<int> op1=op;
    vector<int> op2=op;
        
    op2.push_back(ip[ip.size()-1]);
    ip.pop_back();
        
    solve(ip,op1,res);
    solve(ip,op2,res);
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<int> op;
    vector<vector<int>> res;
    solve(nums,op,res);
    return res;
}
```

# [[notes/subset_trivia|Trivia]]
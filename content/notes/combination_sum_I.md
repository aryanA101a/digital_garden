---
title: "combination sum I"
---
```
void csum(vector<int> ip, int index, int sum, vector<int> &op, vector<vector<int>> &res)
{
    if (index == ip.size())
    {
        if (sum == 0)
        {
            res.push_back(op);
            return;
        }
        return;
    }
    if (ip[index] <= sum)
    {

        op.push_back(ip[index]);
        csum(ip, index, sum - ip[index], op, res);
        op.pop_back();
    }
    csum(ip, index + 1, sum, op, res);
}
vector<vector<int>> combinationSum(vector<int> &candidates, int target)
{
    vector<vector<int>> res;
    vector<int> op;
    csum(candidates, 0, target, op, res);
    return res;
}
```
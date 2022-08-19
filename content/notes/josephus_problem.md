---
title: "josephus problem"
---

Question: https://leetcode.com/problems/find-the-winner-of-the-circular-game/

```c++
void solve(vector<int> ip, int i, int k, int &res)
{
    if (ip.size() == 1)
    {
        res = ip[0];
        return;
    }
    i = (i + k) % ip.size();
    ip.erase(ip.begin() + i);
    solve(ip, i, k, res);
}
int findTheWinner(int n, int k)
{
    --k;
    int res;
    vector<int> ip;

    for (int i = 0; i < n; i++)
    {
        ip.push_back(i + 1);
    }

    solve(ip, 0, k, res);

    return res;
}
```
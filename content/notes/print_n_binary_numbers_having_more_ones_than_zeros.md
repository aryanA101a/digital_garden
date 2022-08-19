---
title: "print n binary numbers having more ones than zeros"
---

Question: https://practice.geeksforgeeks.org/problems/print-n-bit-binary-numbers-having-more-1s-than-0s0252/1

```C++
void solve(int n, int z, int o, string op, vector<string> &res)
{
    if (n == 0)
    {
        res.push_back(op);
        return;
    }

    string op1 = op;
    string op2 = op;

    op1.push_back('1');
    solve(n - 1, z, o + 1, op1, res);

    if (z != o)
    {
        op2.push_back('0');
        solve(n - 1, z + 1, o, op2, res);
    }
}
vector<string> NBitBinary(int N)
{
    vector<string> res;
    string op = "";

    solve(N, 0, 0, op, res);
    return res;
}
```
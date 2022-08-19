---
title: "generate parentheses"
---

Question: https://leetcode.com/problems/generate-parentheses/

```c++
void solve(int o, int c, string op, vector<string> &res)
{
    if (o == 0 && c == 0)
    {
        res.push_back(op);
        return;
    }

    string op1;
    string op2;

    if (o != 0)
    {
        op1 = op;
        op1.push_back('(');

        solve(o - 1, c, op1, res);
    }

    if (o < c)
    {
        op2 = op;
        op2.push_back(')');

        solve(o, c - 1, op2, res);
    }
}
vector<string> generateParenthesis(int n)
{
    vector<string> res;
    string op = "";

    solve(n, n, op, res);

    return res;
}

```
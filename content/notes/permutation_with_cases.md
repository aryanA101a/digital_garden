---
title: "permutation with cases"
---

### Question: https://leetcode.com/problems/letter-case-permutation/

```
void solve(string ip, string op, vector<string> &res)
{

if (ip.length() == 0){
res.push_back(op);
return;
}

string op1 = op;
string op2 = op;

op1.push_back(ip[0]);

char temp = isupper(ip[0]) ? tolower(ip[0]) : toupper(ip[0]);

isalpha(ip[0]) ? isupper(ip[0]) ? tolower(ip[0]) : toupper(ip[0])

: ip[0];

op2.push_back(temp);

ip.erase(ip.begin() + 0);

solve(ip, op1, res);

if (isalpha(op2[op2.length() - 1])){
solve(ip, op2, res);}
}

vector<string> letterCasePermutation(string s)
{
string ip = s;
string op = "";
vector<string> res;
solve(ip, op, res);
return res;
}
```
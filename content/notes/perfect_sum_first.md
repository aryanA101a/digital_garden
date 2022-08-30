---
title: "perfect sum first"
---
```
bool pSum(int ip[], int n, int op, int sum)
{
    // cout<<op<<endl;
    if (n == 0)
    {
        if (op == sum)
        {

            return true;
        }
        else
            return false;
    }

    int op1 = op;
    int op2 = op;

    op2 += ip[n - 1];

    if (pSum(ip, n - 1, op1, sum) == true)
        return true;
    if (pSum(ip, n - 1, op2, sum) == true)
        return true;

    return false;
}

bool perfectSum(int arr[], int n, int sum)
{
    bool tf = pSum(arr, n, 0, sum);
    return tf;
}
```
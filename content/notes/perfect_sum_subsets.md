---
title: "perfect sum subsets"
---
```
int countSum(int ip[], int n, int op, int sum)
{

    if (n == 0)
    {
        if (op == sum)
        {
            return 1;
        }
        else
            return 0;
    }

    int op1 = op;
    int op2 = op;

    op2 += ip[n - 1];

    int l = countSum(ip, n - 1, op1, sum);
    int r = countSum(ip, n - 1, op2, sum);

    return l + r;
}

int perfectSum(int arr[], int n, int sum)
{
    int count = countSum(arr, n, 0, sum);
    return count;
}
```
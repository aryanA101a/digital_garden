---
title: "Base Condition - Induction - Hypothesis Method"
---

Lets understand this method with a question

Q. Print 1 to N numbers

**Input:** n

**Output:** 1 2 3 4 . . . n

## Hypothesis
**Step 1.** Take any possible input and write its output.

nums(7) = 1 2 3 4 5 6 7

**Step 2.** Make the input smaller.

nums(6) = 1 2 3 4 5 6

## Induction
We can infer from the above hypothesis that nums(n-1) prints numbers from 1 to n-1 and nums(n) required to print n after printing numbers from 1 to n-1.
And that completes our induction step.

```
nums(n){ //prints 1 to n

	nums(n-1) //prints 1 to n-1
	cout<<n<<" "
}
```

## Base Condition
Think of the smallest valid input.

```
if(n==1){
	cout<<n
	return
}
```
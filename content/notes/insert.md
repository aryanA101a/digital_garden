---
title: "insert"
---


## Hypothesis
**Step 1.** Take any possible input and write its output.

**insert([0 1 5],2) = [0 1 2 5]**

**Step 2.** Make the input smaller.

**sort([0 1],2) = [0 1 2]**

## Induction

```
insert(v,element){ 
	val=v[v.size()-1]
	v.pop()
	insert(v,temp)
	v.push_back(val)
}
```


## Base Condition
Think of the smallest valid input.

If v.size = 0 or element>=last element in array then push back element directly
```
if(v.size()==0 ||v[v.size-1]<=element){
	v.push_back(element)
	return
}
```

## Pseudocode
```
insert(v,element){ 
	if(v.size()==0 ||v[v.size-1]<=element){
		v.push_back(element)
		return
	}
	val=v[v.size()-1]
	v.pop()
	insert(v,temp)
	v.push_back(val)
}
```

---
title: "Sort an array"
---

**Input:** array

**Output:** sorted array

## Hypothesis
**Step 1.** Take any possible input and write its output.

**sort([1 5 0 2]) = [0 1 2 5]**

**Step 2.** Make the input smaller.

**sort([1 5 0]) = [0 1 5]**

## Induction
After sort(n-1) we need to [[notes/insert|insert]] it back to its proper place
```
sort(v){ 
	temp=v[v.size()-1]
	v.pop()
	sort(v)
	insert(v,temp)	
}
```


## Base Condition
Think of the smallest valid input.

Single element is sorted
```
if(v.size()==1){
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
sort(v){ 
	if(v.size()==1){
		return
	}
	temp=v[v.size()-1]
	v.pop()
	sort(v)
	insert(v,temp)	
}
```

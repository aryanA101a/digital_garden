---
title: "patterns"
---

## 1. Return count
```
f(){
base case
		supporting_case
			true return 1
			false return 0

l=f()
r=f()

return l+r
}
```
#### eg: [[notes/perfect_sum_subsets|Perfect Sum Subsets]]


## 2. Return first
```
f(){
base case
		supporting_case
			if true return true
			if false return false

if(f(op1)==true){
return true
}

if(f(op2)==true){
return true
}

return false
}
```
#### eg: [[notes/perfect_sum_first|Perfect Sum First]]
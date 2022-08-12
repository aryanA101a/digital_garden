---
title: "Height of binary tree"
---

**Input:** root node

**Output:** height of tree

## Hypothesis
**Step 1.** Take any possible input and write its output.

**height(root) = height**

**Step 2.** Make the input smaller.

**nums(root->left) = height of left subtree**

**nums(root->right) = height of right subtree**

## Induction
![[Excalidraw/tree.excalidraw.svg]]

```
height(root){ 
	return 1 + max( height(root->left), height(root->right) )
}
```

## Base Condition
Think of the smallest valid input.

```
if(root==NULL){
	return 0
}
```

## Pseudocode
```
height(root){ 
if(root==NULL){
	return 0
}
	return 1 + max( height(root->left), height(root->right) )
}
```

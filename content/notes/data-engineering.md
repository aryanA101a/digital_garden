---
title: "data-engineering"
---


## Data Modelling

### 1. Normalized Modelling

![[notes/Pasted image 20230507112626.png]]

This is like a copy of the original source schema in use, all the tables are normalized.

### 2. DeNormalized(Star Schema) Modelling

![[notes/Pasted image 20230507114229.png]]

In this type of modelling we use **fact tables** and **dimention tables** to achieve our goal.

**Fact Tables** - These are used to measure a certain fact.
![[notes/Pasted image 20230507113444.png]]

**Dimention Tables** - These are the tables by which we measure.
![[notes/Pasted image 20230507113546.png]]

**Data Marts** - These are flat tables which eventually pulls the fact and dimetions together.
![[notes/Pasted image 20230507114036.png]]
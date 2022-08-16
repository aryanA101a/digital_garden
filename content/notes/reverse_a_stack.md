---
title: "Reverse a stack"
---
```
void ins(stack<int> &St, int e) {
  if (St.empty()) {
    St.push(e);
    return;
  }
  int val = St.top();
  St.pop();
  ins(St, e);
  St.push(val);
}
void rev(stack<int> &St) {
  if (St.size() == 1) {
    return;
  }
  int temp = St.top();
  St.pop();
  rev(St);
  ins(St, temp);
}
```
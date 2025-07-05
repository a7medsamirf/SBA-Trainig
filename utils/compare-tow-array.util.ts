export function arraysHaveDifferences(arr1: any, arr2: any) {
  // Check if lengths are different
  if (arr1.length !== arr2.length) {
    return true;
  }

  // Sort arrays if order doesn't matter
  arr1.sort();
  arr2.sort();

  // Compare elements of the arrays
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return true;
    }
  }

  // No differences found
  return false;
}

#include <stdio.h>

int main() {
  printf("string out 1\n");
  fprintf(stderr, "string err 1\n");
  getchar();
  printf("string out 2\n");
  fprintf(stderr, "string err 2\n");
  fclose(stdout);
}
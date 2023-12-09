#include <stdio.h>
#include <stdlib.h>

#define MAX 100

int adj[MAX][MAX];
int visited[MAX];
int n;

void DFS(int v) {
    printf("%d ", v);
    visited[v] = 1;
    for (int i = 0; i < n; i++) {
        if (adj[v][i] == 1 && visited[i] == 0) {
            DFS(i);
        }
    }
}

void BFS(int v) {
    int queue[MAX], front = -1, rear = -1;
    printf("%d ", v);
    visited[v] = 1;
    queue[++rear] = v;
    while (front != rear) {
        v = queue[++front];
        for (int i = 0; i < n; i++) {
            if (adj[v][i] == 1 && visited[i] == 0) {
                printf("%d ", i);
                visited[i] = 1;
                queue[++rear] = i;
            }
        }
    }
}

int main() {
    printf("Enter number of vertices of the graph: ");
    scanf("%d", &n);
    printf("Enter the adjacency matrix of the graph:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &adj[i][j]);
        }
    }
    int source;
    printf("Enter the source vertex: ");
    scanf("%d", &source);
    printf("The BFS sequence is: ");
    BFS(source);
    printf("\nThe DFS sequence is: ");
    for (int i = 0; i < n; i++) {
        visited[i] = 0;
    }
    DFS(source);
    return 0;
}
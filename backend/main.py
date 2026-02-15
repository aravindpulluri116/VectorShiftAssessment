from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    pipeline: str


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    """
    Parse a pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges (connections) in the pipeline
    - is_dag: Whether the pipeline forms a Directed Acyclic Graph (DAG)
    """
    try:
        # Parse the JSON string from the frontend
        pipeline = json.loads(data.pipeline)
        
        nodes = pipeline.get('nodes', [])
        edges = pipeline.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Check if the graph is a DAG using Kahn's algorithm
        is_dag = check_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        return {'error': str(e)}


def check_dag(nodes, edges):
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sorting.
    """
    if not nodes or not edges:
        return True  # Empty or edge-less graph is trivially a DAG
    
    # Build adjacency list and in-degree count
    adjacency = {}
    in_degree = {}
    
    # Initialize all nodes
    for node in nodes:
        node_id = node.get('id')
        adjacency[node_id] = []
        in_degree[node_id] = 0
    
    # Build the graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        if source in adjacency and target in adjacency:
            adjacency[source].append(target)
            in_degree[target] = in_degree.get(target, 0) + 1
    
    # Kahn's algorithm: Find nodes with no incoming edges
    from collections import deque
    queue = deque()
    
    for node_id in in_degree:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    visited_count = 0
    topo_order = []
    
    while queue:
        node = queue.popleft()
        topo_order.append(node)
        visited_count += 1
        
        for neighbor in adjacency.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited_count == len(nodes)

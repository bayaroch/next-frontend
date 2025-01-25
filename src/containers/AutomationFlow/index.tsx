/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface CustomNodeData {
  label: string
}

interface CustomEdgeData {
  // Add any custom edge properties here
}

export const InputNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      borderRadius: '5px',
      background: 'white',
    }}
  >
    <Handle
      type="source"
      position={Position.Right}
      style={{ right: -5, top: '50%' }}
    />
    <div>{data.label}</div>
  </div>
)

export const OutputNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      borderRadius: '5px',
      background: 'white',
    }}
  >
    <Handle
      type="target"
      position={Position.Left}
      style={{ left: -5, top: '50%' }}
    />
    <div>{data.label}</div>
  </div>
)

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
}

interface AutomationFlowProps {
  is_global?: boolean
  is_active?: boolean
  only_instant?: boolean
  ignore_global?: boolean
  is_private_response?: boolean
}

const AutomationFlow: React.FC<AutomationFlowProps> = ({
  is_global,
  is_active,
  only_instant,
  ignore_global,
  is_private_response,
}) => {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([
    {
      id: '1',
      type: 'input',
      data: { label: 'Posts comment on Facebook' },
      position: { x: 120, y: 120 },
    },
    {
      id: '2',
      type: 'output',
      data: { label: 'Instant Response' },
      position: { x: 350, y: 50 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'AI Response' },
      position: { x: 350, y: 180 },
    },
  ])

  const [edges, setEdges] = useState<Edge<CustomEdgeData>[]>([])

  useEffect(() => {
    const filteredEdges = edges.filter((edge) => edge.source !== '1')
    if (only_instant) {
      const newEdge: Edge = {
        id: `e1-1`,
        source: '1',
        target: '2',
        animated: true,
      }
      setEdges([...filteredEdges, newEdge])
    } else {
      const newEdge: Edge = {
        id: `e1-1`,
        source: '1',
        target: '3',
        animated: true,
      }
      setEdges([...filteredEdges, newEdge])
    }
  }, [only_instant])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect: OnConnect = useCallback(
    (params) => {
      // Check if source and target are valid strings
      if (params.source && params.target) {
        // Only allow connections from node 1 to node 2 or 3
        if (
          params.source === '1' &&
          (params.target === '2' || params.target === '3')
        ) {
          // Remove any existing edges from node 1
          const filteredEdges = edges.filter((edge) => edge.source !== '1')
          // Add the new edge
          const newEdge: Edge = {
            id: `e1-${params.target}`,
            source: params.source,
            target: params.target,
            animated: true,
          }
          setEdges([...filteredEdges, newEdge])
        }
      }
    },
    [edges]
  )

  // eslint-disable-next-line no-console
  console.log(edges)

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectOnClick={true}
        nodeTypes={nodeTypes}
      />
    </Box>
  )
}

export default AutomationFlow

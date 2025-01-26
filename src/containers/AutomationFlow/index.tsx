/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge, Box, Chip, Stack, Typography } from '@mui/material'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
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
  Connection,
  NodeDragHandler,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './override.css'
import { NodeItem } from './NodeItem'
import { useTranslation } from 'react-i18next'
import { Bolt, BoltOutlined, FacebookOutlined } from '@mui/icons-material'

interface CustomNodeData {
  content: ReactNode
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
  input: (props: any) => (
    <NodeItem
      {...props}
      connectable={props.connectable}
      handleType="source"
      handlePosition={Position.Right}
    />
  ),
  output: (props: any) => (
    <NodeItem
      {...props}
      connectable={props.connectable}
      handleType="target"
      handlePosition={Position.Left}
    />
  ),
  aiNode: (props: any) => (
    <NodeItem
      {...props}
      handleType="both"
      connectable={props.connectable}
      handlePosition={Position.Left}
      rightHandlePosition={Position.Right}
    />
  ),
}

interface AutomationFlowProps {
  is_global?: boolean
  is_active?: boolean
  only_instant?: boolean
  ignore_global?: boolean
  is_private_response?: boolean
  setValue?: (name: string, value: any) => void
  comment_responses: any[]
  isAiActive?: boolean
}

const AutomationFlow: React.FC<AutomationFlowProps> = ({
  is_global,
  is_active,
  only_instant,
  ignore_global,
  is_private_response,
  isAiActive,
  setValue,
  comment_responses,
}) => {
  const { t } = useTranslation()
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>()

  const [edges, setEdges] = useState<Edge<CustomEdgeData>[]>([])

  const responseCount = comment_responses.length

  const createNodeContent = useCallback(
    () => [
      {
        id: '1',
        type: 'input',
        data: {
          content: (
            <Box>
              <Box>
                <Typography
                  sx={{ fontSize: 12, width: '100%', textAlign: 'left' }}
                >
                  <Box component={'span'}>
                    <BoltOutlined sx={{ fontSize: 12, top: 2 }} />
                  </Box>
                  {t('AUTOMATION.when')}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: 14, width: '100%', textAlign: 'left' }}
                >
                  <Box
                    component={'span'}
                    sx={{ position: 'relative', top: 4, pr: 0.3 }}
                  >
                    <Box
                      component={'img'}
                      width={20}
                      height={20}
                      src={'/images/facebook-messenger.png'}
                    />
                  </Box>
                  {t('AUTOMATION.comments_on_posts')}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, width: '100%', textAlign: 'left' }}
                >
                  {is_global
                    ? t('AUTOMATION.any_posts_desc')
                    : t('AUTOMATION.this_posts_desc')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right', pt: 1 }}>
                {t('AUTOMATION.then')}
              </Box>
            </Box>
          ),
        },
        position: { x: 20, y: 120 },
        draggable: true,
        connectable: true,
      },
      {
        id: '2',
        type: 'output',
        data: {
          content: (
            <Box>
              <Box>
                <Stack
                  direction={'row'}
                  spacing={1}
                  sx={{ width: '100%', textAlign: 'left' }}
                >
                  <Box component={'span'}>
                    <FacebookOutlined sx={{ fontSize: 24, top: 2 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10, mb: 0, lineHeight: 1 }}>
                      {t('AUTOMATION.facebook')}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                      {t('AUTOMATION.send_response')}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Stack direction={'row'} spacing={1}>
                <Chip label={t('AUTOMATION.chat')} />
                {!is_private_response && (
                  <Chip label={t('AUTOMATION.comment')} />
                )}
              </Stack>
            </Box>
          ),
        },
        position: { x: 400, y: 50 },
        draggable: true,
        connectable: true,
      },
      {
        id: '3',
        type: 'aiNode',
        data: {
          content: (
            <Box sx={{ opacity: isAiActive ? 1 : 0.5 }}>
              <Box>
                <Stack
                  direction={'row'}
                  spacing={1}
                  sx={{ width: '100%', textAlign: 'left' }}
                >
                  <Box component={'span'} sx={{ fontWeight: 'bold' }}>
                    AI
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10, mb: 0, lineHeight: 1 }}>
                      {t('AUTOMATION.analysis_comment')}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                      <Box
                        sx={{
                          background: (theme) => theme.palette.primary.main,
                          color: '#fff',
                          px: 0.5,
                          borderRadius: 1,
                          mr: 0.5,
                        }}
                        component={'span'}
                      >
                        {responseCount}
                      </Box>
                      {t('AUTOMATION.chooses_keyword')}{' '}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ textAlign: 'right', pt: 1 }}>
                {t('AUTOMATION.next_step')}
              </Box>
            </Box>
          ),
        },
        position: { x: 400, y: 200 },
        draggable: isAiActive,
        connectable: isAiActive,
      },
      {
        id: '4',
        type: 'output',
        data: {
          content: (
            <Box sx={{ opacity: isAiActive ? 1 : 0.5 }}>
              <Box>
                <Stack
                  direction={'row'}
                  spacing={1}
                  sx={{ width: '100%', textAlign: 'left' }}
                >
                  <Box component={'span'}>
                    <FacebookOutlined sx={{ fontSize: 24, top: 2 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10, mb: 0, lineHeight: 1 }}>
                      {t('AUTOMATION.facebook')}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                      {t('AUTOMATION.send_response')}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Stack direction={'row'} spacing={1}>
                <Chip label={t('AUTOMATION.chat')} />
                {!is_private_response && (
                  <Chip label={t('AUTOMATION.comment')} />
                )}
              </Stack>
            </Box>
          ),
        },
        position: { x: 800, y: 150 },
        draggable: true,
        connectable: true,
      },
    ],
    [
      ignore_global,
      is_private_response,
      is_global,
      comment_responses,
      isAiActive,
    ]
  )

  useEffect(() => {
    setNodes((prevNodes) => {
      const newContent = createNodeContent()
      return (
        prevNodes?.map((node) => {
          const updatedNode = newContent.find((n) => n.id === node.id)
          return updatedNode ? { ...node, data: updatedNode.data } : node
        }) || newContent
      )
    })
  }, [
    is_global,
    is_active,
    only_instant,
    ignore_global,
    is_private_response,
    createNodeContent,
  ])

  // Update edges when only_instant changes
  useEffect(() => {
    const newEdges: Edge<CustomEdgeData>[] = [
      {
        id: 'e3-4',
        source: '3',
        target: '4',
        animated: true,
      },
    ]

    const sourceToTargetEdge = {
      id: only_instant ? 'e1-2' : 'e1-3',
      source: '1',
      target: only_instant ? '2' : '3',
      animated: true,
    }

    newEdges.push(sourceToTargetEdge)
    setEdges(newEdges)
  }, [only_instant])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds as any)),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const newEdges = applyEdgeChanges(changes, edges)
      setEdges(newEdges)

      // Check if the edge from node 1 has changed
      const edgeFromNode1 = newEdges.find((edge) => edge.source === '1')
      if (edgeFromNode1) {
        const newOnlyInstant = edgeFromNode1.target === '2'
        setValue && setValue('only_instant', newOnlyInstant)
      }
    },
    [edges, setValue]
  )

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      if (params.source === '1') {
        const newOnlyInstant = params.target === '2'
        setValue && setValue('only_instant', newOnlyInstant)

        const newEdge: Edge = {
          id: newOnlyInstant ? 'e1-2' : 'e1-3',
          source: '1',
          target: newOnlyInstant ? '2' : '3',
          animated: true,
        }

        setEdges((eds) => eds.filter((e) => e.source !== '1').concat(newEdge))
      } else if (params.source === '3' && params.target === '4') {
        const newEdge: Edge = {
          id: 'e3-4',
          source: '3',
          target: '4',
          animated: true,
        }
        setEdges((eds) => eds.filter((e) => e.id !== 'e3-4').concat(newEdge))
      }
    },
    [setValue]
  )

  const onNodeDragStop: NodeDragHandler = useCallback((event, node, nodes) => {
    setNodes((prevNodes) =>
      prevNodes?.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      )
    )
  }, [])

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
        onNodeDragStop={onNodeDragStop}
      />
    </Box>
  )
}

export default AutomationFlow

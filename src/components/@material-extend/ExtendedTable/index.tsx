import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TableSortLabel,
} from '@mui/material'
import _ from 'lodash'
import DataLoading, { DataLoadingProps } from '@components/DataLoading'
import { Direction } from '@constants/common.constants'

export interface Column {
  label: string
  sortable?: boolean
  sortField?: string
  width?: string | number
  minWidth?: string | number
  align?: string
}

export interface ExtendedTableProps {
  columns: Column[]
  data: any[]
  onSort?: (field: string, order: Direction) => void
  renderRow: (data: any, index: number) => any
  isLoading?: boolean
  dataLoading?: DataLoadingProps
  filter?: any
}

const ExtendedTable: React.FC<ExtendedTableProps> = ({
  columns,
  data,
  onSort,
  isLoading,
  renderRow,
  dataLoading,
  filter,
}) => {
  const initLoad = isLoading && _.isEmpty(data)
  return (
    <Paper
      elevation={2}
      sx={{ position: 'relative', minHeight: initLoad ? 250 : 'auto' }}
    >
      {isLoading ? (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 60,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <CircularProgress size={20} />
        </Box>
      ) : null}
      <TableContainer className="scrollbar-container">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    width: column.width ? column.width : 'auto',
                    maxWidth: column.width ? column.width : 'auto',
                    minWidth: column.minWidth ? column.minWidth : 'auto',
                    textAlign: column.align ? column.align : 'left',
                  }}
                  key={column.label}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={filter?.orderBy === column.sortField}
                      direction={
                        filter?.orderBy === column.sortField
                          ? filter?.orderDir
                          : undefined
                      }
                      onClick={() => {
                        if (column.sortField) {
                          const newDirection =
                            filter?.orderBy === column.sortField
                              ? filter?.orderDir === Direction.asc
                                ? Direction.desc
                                : Direction.asc
                              : Direction.desc

                          onSort && onSort(column.sortField, newDirection)
                        }
                      }} // Default sort order on first click
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              !_.isEmpty(data) &&
              data.map((item, index) => renderRow(item, index))}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && (
        <DataLoading
          sx={{ textAlign: 'center' }}
          isLoading={false}
          isEmptyData={data && _.isEmpty(data)}
          {...dataLoading}
        />
      )}
    </Paper>
  )
}

export default ExtendedTable

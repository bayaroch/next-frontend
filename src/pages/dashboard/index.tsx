import React, { useState } from 'react'
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import _ from 'lodash'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { useAuth } from '@global/AuthContext'
import {
  CommentJobHistoryResponse,
  PageJobHistoryService,
} from '@services/page.services'
import { TableRow, TableCell } from '@mui/material'
import ExtendedTable, {
  Column,
} from '@components/@material-extend/ExtendedTable'
import { useNavigate } from 'react-router-dom'
import { BarChartOutlined, DashboardOutlined } from '@mui/icons-material'
import DataLoading from '@components/DataLoading'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const DashboardPage: React.FC = () => {
  const { t } = useTranslation()
  const { init } = useAuth()
  const current = _.get(init, 'page_info.fb_page_id', '')
  const [filter, setFilter] = useState({
    start_at: dayjs().startOf('month').format('YYYY-MM-DD'),
    end_at: dayjs().endOf('month').format('YYYY-MM-DD'),
  })

  const { data, isLoading } = useQuery<CommentJobHistoryResponse, Error>(
    ['products', filter],
    () =>
      PageJobHistoryService({
        pageId: current,
        payload: { start_at: filter.start_at, end_at: filter.end_at },
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  const columns: Column[] = [
    { label: 'ID', sortField: 'comment_id', sortable: false },
    { label: t('SYSCOMMON.comment'), sortField: 'comment', sortable: false },
    { label: t('SYSCOMMON.status'), sortField: 'job_status', sortable: false },
    { label: t('SYSCOMMON.is_sent'), sortField: 'is_sent', sortable: false },
    {
      label: t('SYSCOMMON.error'),
      sortField: 'error_type',
      sortable: false,
    },
  ]

  const handleDateChange = (
    date: dayjs.Dayjs | null,
    type: 'start_at' | 'end_at'
  ) => {
    if (date) {
      setFilter({ ...filter, [type]: date.format('YYYY-MM-DD') })
    }
  }

  const renderRow = (item: any, index: number) => (
    <TableRow key={index}>
      <TableCell>{item.comment_id}</TableCell>
      <TableCell>{item.comment}</TableCell>
      <TableCell>{item.job_status}</TableCell>
      <TableCell>{item.is_sent ? 'Yes' : 'No'}</TableCell>
      <TableCell>{item.error_type}</TableCell>
    </TableRow>
  )

  const pieChartData = React.useMemo(() => {
    if (!data) return []
    const statusCount = _.countBy(data.data, 'job_status')
    return Object.entries(statusCount).map(([name, value]) => ({ name, value }))
  }, [data])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const navigate = useNavigate()

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        {t('SYSCOMMON.dashboard')}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid>
            <DatePicker
              label={t('SYSCOMMON.start_date')}
              value={dayjs(filter.start_at)}
              onChange={(date) => handleDateChange(date, 'start_at')}
            />
          </Grid>
          <Grid>
            <DatePicker
              label={t('SYSCOMMON.end_date')}
              value={dayjs(filter.end_at)}
              onChange={(date) => handleDateChange(date, 'end_at')}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 8 }}>
          {data && (
            <ExtendedTable
              columns={columns}
              data={data.data}
              isLoading={isLoading}
              renderRow={renderRow}
              filter={filter}
              dataLoading={{
                resource: t('SYSCOMMON.reports'),
                emptyDesc: t('SYSCOMMON.no_data'),
                icon: <DashboardOutlined />,
                isLoading: isLoading,
                emptyAction: (
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/automation')}
                  >
                    {t('SYSCOMMON.go_to_automation')}
                  </Button>
                ),
              }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <Box sx={{ height: 270, width: '100%', boxShadow: 2 }}>
            <DataLoading
              resource={t('SYSCOMMON.charts')}
              emptyDesc={t('SYSCOMMON.no_chart')}
              isEmptyData={_.isEmpty(pieChartData)}
              icon={<BarChartOutlined />}
              isLoading={isLoading}
            />
            {!_.isEmpty(pieChartData) && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage

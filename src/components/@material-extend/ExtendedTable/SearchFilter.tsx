import { FilterParams } from '@constants/common.constants'
import { Button, OutlinedInput, Stack } from '@mui/material'
import _ from 'lodash'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useFilterForm from './useFilterForm'
import Close from '@mui/icons-material/Close'

export type SearchParams = {
  keyword: string
}

interface SearchFilterProps {
  onFilter: (data: SearchParams) => void
  filter: FilterParams
}

const SearchFilter: React.FC<SearchFilterProps> = (props) => {
  const {
    onFilter,
    filter: { search },
  } = props
  const { t } = useTranslation()

  const onSubmit = (values: any) => {
    onFilter({
      keyword: values.keyword,
    })
  }

  // const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { Controller, methods } = useFilterForm()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    // reset,
  } = methods

  const handleDelete = () => {
    setValue('keyword', '')
    onFilter({ keyword: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post">
      <Stack
        sx={{ mt: '5px', width: '100%' }}
        spacing={1}
        alignItems={'center'}
        direction={'row'}
      >
        <Controller
          name="keyword"
          control={control}
          render={({ field: { ref, ...rest } }: FieldValues) => (
            <Stack direction={'row'} sx={{ width: '100%' }} spacing={2}>
              <OutlinedInput
                {...rest}
                inputRef={ref}
                isHelperShow={false}
                fullWidth
                error={errors.keyword ? true : false}
                data-test-id="keyword"
                startLabel={t('SYSCOMMON.search_keyword')}
                startLabelStyle={{ pl: 3, pr: 3, minWidth: 'auto' }}
                endAdornment={
                  !_.isEmpty(search) ? (
                    <Close
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleDelete()}
                    />
                  ) : null
                }
              />
              <Button
                disableRipple
                variant="contained"
                color="primary"
                sx={{
                  height: 47,
                }}
                type="submit"
              >
                {t('SYSCOMMON.search')}
              </Button>
            </Stack>
          )}
        />
      </Stack>
    </form>
  )
}

export default SearchFilter

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Box, Button, List, Paper, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useConfirm } from '@components/Confirm'
import { useToast } from '@components/ToastProvider'
import {
  CreateProductParams,
  Product,
  ProductService,
} from '@services/payment.services'
import DataLoading from '@components/DataLoading'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import CreateProductDialog from './CreateProductDialog'

const ITEMS_PER_PAGE = 10

const ProductListPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const confirm = useConfirm()
  const { t } = useTranslation()

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery<Product[], Error>(
    ['products'],
    () => ProductService.getProductsByPage(ITEMS_PER_PAGE),
    {
      refetchOnWindowFocus: false,
    }
  )

  // eslint-disable-next-line no-console
  console.log(productsData)

  const createProductMutation = useMutation<any, Error, CreateProductParams>(
    (input) => ProductService.createProduct(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products'])
        showToast('Product created successfully', { severity: 'success' })
      },
    }
  )

  const updateProductMutation = useMutation<
    any,
    Error,
    { id: string; payload: CreateProductParams }
  >(({ id, payload }) => ProductService.updateProduct({ id, payload }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      showToast('Product updated successfully', { severity: 'success' })
    },
  })

  const deleteProductMutation = useMutation<any, Error, string>(
    (id) => ProductService.deleteProduct(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products'])
        showToast('Product deleted successfully', { severity: 'success' })
      },
    }
  )

  const handleOpen = () => setOpen(true)

  const handleDelete = (product: Product) => {
    confirm({
      title: 'Delete Product',
      description: 'Are you sure you want to delete this product?',
      additional_confirmation: 'delete',
    })
      .then(() => {
        deleteProductMutation.mutate(product.product_id)
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Delete cancelled')
      })
  }

  const handleSubmit = (data: CreateProductParams) => {
    createProductMutation.mutate(data)
  }

  const handleClose = () => setOpen(false)

  const handleCreateProduct = (data: CreateProductParams) => {
    createProductMutation.mutate({ ...data, additional_settings: {} })
    handleClose()
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">{t('ADMIN.products')}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          endIcon={<Add />}
        >
          {t('SYSCOMMON.create')}
        </Button>
      </Box>

      <List sx={{ p: 0 }}>
        {productsData?.map((product) => (
          <Paper
            key={product.product_id}
            sx={{
              overflow: 'hidden',
              boxShadow: '0 4px 8px #20222408,0 1px 2px #00000014',
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Price: \${product.price}</Typography>
            <Typography>Duration: {product.duration_days} days</Typography>
            <Box mt={1}>
              <Button onClick={() => handleDelete(product)} color="error">
                {t('SYSCOMMON.delete')}
              </Button>
              {/* Add edit button and functionality here */}
            </Box>
          </Paper>
        ))}
      </List>

      <DataLoading
        resource={t('SYSCOMMON.product')}
        isLoading={isLoading}
        isEmptyData={_.isEmpty(productsData) && productsData !== undefined}
        emptyAction={
          <Button variant="outlined" onClick={handleOpen} endIcon={<Add />}>
            {t('SYSCOMMON.create')}
          </Button>
        }
        error={error}
      />
      <CreateProductDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleCreateProduct}
      />
      {/* Add CreateProductDialog component here */}
    </Box>
  )
}

export default ProductListPage

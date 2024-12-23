import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Add,
  MoreVert as MoreVertIcon,
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
} from '@mui/icons-material'
import { useConfirm } from '@components/Confirm'
import { useToast } from '@components/ToastProvider'
import {
  CreateProductParams,
  Product,
  ProductionListResponse,
  ProductService,
} from '@services/payment.services'
import { useTranslation } from 'react-i18next'
import ExtendedTable from '@components/@material-extend/ExtendedTable'
import ProductDialog from './ProductDialog'

const ProductListPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const confirm = useConfirm()
  const { t } = useTranslation()

  const { data: productsData, isLoading } = useQuery<
    ProductionListResponse,
    Error
  >(['products'], () => ProductService.getProductsByPage(), {
    refetchOnWindowFocus: false,
  })

  const createProductMutation = useMutation<any, Error, CreateProductParams>(
    (input) => ProductService.createProduct(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products'])
        showToast('Product created successfully', { severity: 'success' })
        handleClose()
      },
      onError: (err: any) => {
        if (err.code && err) {
          showToast(t(`ERROR.${err.code}`), { severity: 'error' })
        } else {
          showToast(t('ERROR.E000070'), { severity: 'error' })
        }
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
      handleClose()
    },
    onError: (err: any) => {
      if (err.code && err) {
        showToast(t(`ERROR.${err.code}`), { severity: 'error' })
      } else {
        showToast(t('ERROR.E000070'), { severity: 'error' })
      }
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

  const handleSubmit = (data: CreateProductParams) => {
    if (!selectedProduct) {
      createProductMutation.mutate(data)
    } else {
      updateProductMutation.mutate({
        id: selectedProduct.product_id,
        payload: data,
      })
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleMenuOpen = (event: any, product: Product) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedProduct(product)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // eslint-disable-next-line no-console
  console.log(selectedProduct, 'selectted')

  const handleEdit = (item: Product) => {
    setOpen(true)
    setSelectedProduct(item)
    // eslint-disable-next-line no-console
    console.log(item, 'item')
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedProduct) {
      confirm({
        title: 'Delete Product',
        description: 'Are you sure you want to delete this product?',
        additional_confirmation: 'delete',
      })
        .then(() => {
          deleteProductMutation.mutate(selectedProduct.product_id)
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Delete cancelled')
        })
    }
    handleMenuClose()
  }

  const productColumns = [
    {
      label: t('PRODUCT.name'),
      width: 200,
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
    },
    {
      label: t('PRODUCT.price'),
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      align: 'center',
    },
    {
      label: t('PRODUCT.duration_days'),
      width: 140,
      minWidth: 140,
      maxWidth: 140,
      align: 'center',
    },
    {
      label: t('PRODUCT.description'),
      width: 'auto',
      align: 'left',
    },
    {
      label: t('PRODUCT.actions'),
      minWidth: 150,
      width: 150,
      maxWidth: 150,
      align: 'center',
    },
  ]

  const renderProductRow = (item: Product) => {
    return (
      <TableRow
        sx={{
          cursor: 'pointer',
          '&:hover': {
            background: '#f2f2f2',
          },
        }}
        key={item.product_id}
      >
        <TableCell align="left">{item.name}</TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">{item.duration_days}</TableCell>
        <TableCell align="left">{item.description}</TableCell>
        <TableCell align="center">
          <MoreVertIcon
            sx={{ fontSize: 18, height: 18, position: 'relative', top: 3 }}
            onClick={(event) => handleMenuOpen(event, item)}
          />
        </TableCell>
      </TableRow>
    )
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

      <ExtendedTable
        isLoading={isLoading}
        columns={productColumns}
        data={productsData?.data}
        renderRow={renderProductRow}
      />

      <ProductDialog
        data={selectedProduct}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isLoading={
          createProductMutation.isLoading || updateProductMutation.isLoading
        }
      />

      {selectedProduct && (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleEdit(selectedProduct)}>
            <EditIcon fontSize="small" style={{ marginRight: 8 }} />
            {t('SYSCOMMON.edit')}
          </MenuItem>
          <MenuItem onClick={() => handleDelete()}>
            <DeleteIcon fontSize="small" style={{ marginRight: 8 }} />
            {t('SYSCOMMON.delete')}
          </MenuItem>
        </Menu>
      )}
      {/* Add CreateProductDialog component here */}
    </Box>
  )
}

export default ProductListPage

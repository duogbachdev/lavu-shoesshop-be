import SupplierModel from "../models/SupplierModel"

const getSuppliers = async (_req: any, res: any) => {
  try {
    const items = await SupplierModel.find({ isDeleted: false })

    res.status(200).json({
      message: 'Get suppliers successfully',
      data: items
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const addSupplier = async (req: any, res: any) => {
  const body = req.body
  try {
    const newSupplier = new SupplierModel(body)
    newSupplier.save()

    res.status(200).json({
      message: 'Add new supplier successfully',
      data: newSupplier
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const updateSupplier = async (req: any, res: any) => {
  const body = req.body
  const { id } = req.query

  try {
    await SupplierModel.findByIdAndUpdate(id, body)

    res.status(200).json({
      message: 'Update supplier successfully',
      data: []
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const deleteSupplier = async (req: any, res: any) => {
  const { id } = req.query

  try {
    await SupplierModel.findByIdAndDelete(id)

    res.status(200).json({
      message: 'Delete supplier successfully',
      data: []
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

export { getSuppliers, addSupplier, updateSupplier, deleteSupplier }
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { FiUploadCloud } from 'react-icons/fi' // Icon
import grilledSalmon from '../../assets/images/grilledSalmon.jpg'
import avocadotoast from '../../assets/images/avocadotoast.jpg'
import { storage, db } from '../../../firebase-config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc,getDocs} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const defaultMeals = [
  {
    mealName: 'Grilled Salmon',
    description: 'Healthy omega-3 rich fish with lemon sauce',
    calories: 320,
    category: 'Lunch',
    dietType: 'Low Carb',
    goodFor: ['Heart Health', 'Diabetes'],
    image: grilledSalmon,
    available: true,
    price: 180, // 👈 Add price in pesos
  },
  {
    mealName: 'Avocado Toast',
    description: 'Toasted bread with fresh avocado and poached egg',
    calories: 250,
    category: 'Breakfast',
    dietType: 'Balanced',
    goodFor: ['Weight Loss', 'Energy Boost'],
    image: avocadotoast,
    available: true,
    price: 120, // 👈 Add price in pesos
  },
]

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner']

export default function Meals() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [price, setPrice] = useState('')
  const [mealName, setMealName] = useState('')
  const [description, setDescription] = useState('')
  const [calories, setCalories] = useState('')
  const [category, setCategory] = useState('Breakfast')
  const [dietType, setDietType] = useState('Balanced')
  const [newDietType, setNewDietType] = useState('')
  const [dietTypes, setDietTypes] = useState(['Keto', 'Vegan', 'Low Carb', 'Balanced'])
  const [showAddDietModal, setShowAddDietModal] = useState(false)

  const [goodFor, setGoodFor] = useState([])
  const [newTag, setNewTag] = useState('')
  const [allTags, setAllTags] = useState([
    'Diabetes', 'Hypertension', 'Heart Health', 'Weight Loss', 'Muscle Gain', 'Energy Boost',
  ])
  const [showAddTagModal, setShowAddTagModal] = useState(false)

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [meals, setMeals] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [filterTag, setFilterTag] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  const dropRef = useRef()
  const fileInputRef = useRef()

  useEffect(() => {
  const fetchMeals = async () => {
    const snapshot = await getDocs(collection(db, "meals"))
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setMeals(data)
  }
  fetchMeals()
}, [])


  const handleImageChange = (file) => {
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const onFileInputChange = (e) => handleImageChange(e.target.files[0])
  const onDrop = (e) => {
    e.preventDefault()
    handleImageChange(e.dataTransfer.files[0])
  }
  const allowDragOver = (e) => e.preventDefault()

  const toggleTag = (tag) => {
    setGoodFor((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!image) {
    toast.error('Please upload an image')
    return
  }

  try {
    // 1. Upload image
    const imageRef = ref(storage, `meals/${uuidv4()}-${image.name}`)
    await uploadBytes(imageRef, image)
    const imageUrl = await getDownloadURL(imageRef)

    // 2. Prepare new meal
    const newMeal = {
      mealName,
      description,
      calories: parseInt(calories),
      category,
      dietType,
      goodFor,
      image: imageUrl, // ✅ uploaded image URL
      price: parseFloat(price),
      available: true,
      createdAt: new Date()
    }

    // 3. Save to Firestore
    await addDoc(collection(db, "meals"), newMeal)
    setMeals((prev) => [newMeal, ...prev])
    toast.success('Meal added!')

    resetForm()
  } catch (error) {
    console.error("Upload Error:", error)
    toast.error("Error saving meal with image")
  }
}


  const resetForm = () => {
    setMealName('')
    setDescription('')
    setCalories('')
    setCategory('Breakfast')
    setDietType('Balanced')
    setGoodFor([])
    setImage(null)
    setPreview(null)
    setShowModal(false)
    setEditIndex(null)
    setNewTag('')
    setNewDietType('')
    setPrice('')
  }

  const handleDelete = (index) => {
    if (confirm('Delete this meal?')) {
      const updated = meals.filter((_, i) => i !== index)
      setMeals(updated)
      toast.success('Meal deleted')
    }
  }

  const handleEdit = (index) => {
    const meal = meals[index]
    setMealName(meal.mealName)
    setDescription(meal.description)
    setCalories(meal.calories)
    setCategory(meal.category)
    setDietType(meal.dietType)
    setGoodFor(meal.goodFor || [])
    setPrice(meal.price || '')
    setPreview(meal.image)
    setEditIndex(index)
    setShowModal(true)
  }

  const filteredMeals = meals.filter((meal) => {
    const matchCategory = activeFilter === 'All' || meal.category === activeFilter
    const matchTag = filterTag ? meal.goodFor?.includes(filterTag) : true
    return matchCategory && matchTag
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Meals</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          + Add Meal
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm ${activeFilter === cat ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <select
          onChange={(e) => setFilterTag(e.target.value)}
          className="ml-auto border px-3 py-1.5 rounded-md text-sm"
        >
          <option value="">All Health Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Meals List */}
      {filteredMeals.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals.map((meal, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow group overflow-hidden relative">
              <img src={meal.image} alt={meal.mealName} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-indigo-600">{meal.mealName}</h3>
                <p className="text-sm text-gray-600">{meal.description}</p>
                <div className="flex justify-between items-center flex-wrap mt-2">
                <div className="text-sm text-gray-500">
                    {meal.calories} cal · {meal.category} · {meal.dietType}
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  ₱{meal.price?.toFixed(2)}
                </div>
                <div className="flex flex-wrap gap-1 justify-end mt-1 sm:mt-0">
                    {meal.goodFor.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => handleEdit(idx)} className="bg-yellow-400 text-white text-xs px-2 py-1 rounded">Edit</button>
               <button
                  onClick={() => {
                    setDeleteIndex(idx)
                    setShowDeleteModal(true)
                  }}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
              </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No meals available.</p>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative">
            <button onClick={resetForm} className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl">
              &times;
            </button>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              {editIndex !== null ? 'Edit Meal' : 'Add New Meal'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={mealName} onChange={(e) => setMealName(e.target.value)} placeholder="Meal Name" className="w-full border-b px-2 py-2" required />
              <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" className="w-full border-b px-2 py-2" required />
              <input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="Price (₱)"
  className="w-full border-b px-2 py-2"
  required
/>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-b px-2 py-2">
                {categories.slice(1).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                value={dietType}
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    setShowAddDietModal(true)
                  } else {
                    setDietType(e.target.value)
                  }
                }}
                className="w-full border-b px-2 py-2"
              >
                {dietTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="__add_new__">+ Add new diet type</option>
              </select>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="col-span-1 md:col-span-2 border-b px-2 py-2 resize-none" />

              {/* Tag Checkboxes + Add New */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="text-sm">
                      <input type="checkbox" checked={goodFor.includes(tag)} onChange={() => toggleTag(tag)} className="mr-1" />
                      {tag}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowAddTagModal(true)}
                    className="text-sm text-indigo-600 hover:underline ml-2"
                  >
                    + Add new health condition
                  </button>
                </div>
              </div>

              {/* Image Upload */}
              <div
                ref={dropRef}
                onClick={() => fileInputRef.current.click()}
                onDrop={onDrop}
                onDragOver={allowDragOver}
                className="col-span-1 md:col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:bg-indigo-50 transition"
              >
                <FiUploadCloud className="text-3xl mx-auto mb-2 text-indigo-500" />
                Click or drag & drop image here
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileInputChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>

              {preview && <img src={preview} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-md shadow col-span-1 md:col-span-2" />}

              <div className="col-span-1 md:col-span-2 flex justify-end">
                <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-500">
                  {editIndex !== null ? 'Update Meal' : 'Add Meal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Diet Type Modal */}
      {showAddDietModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl relative">
            <button onClick={() => setShowAddDietModal(false)} className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl">
              &times;
            </button>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Add New Diet Type</h2>
            <input type="text" value={newDietType} onChange={(e) => setNewDietType(e.target.value)} placeholder="Enter diet type" className="w-full border px-3 py-2 rounded-md mb-4" />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (newDietType && !dietTypes.includes(newDietType)) {
                    setDietTypes([...dietTypes, newDietType])
                    setDietType(newDietType)
                    setNewDietType('')
                    setShowAddDietModal(false)
                    toast.success(`Diet type "${newDietType}" added`)
                  } else {
                    toast.error('Invalid or duplicate diet type')
                  }
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tag Modal */}
      {showAddTagModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl relative">
            <button onClick={() => setShowAddTagModal(false)} className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl">
              &times;
            </button>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Add New Health Condition</h2>
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Enter health condition" className="w-full border px-3 py-2 rounded-md mb-4" />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (newTag && !allTags.includes(newTag)) {
                    setAllTags([...allTags, newTag])
                    toast.success(`Tag "${newTag}" added`)
                    setNewTag('')
                    setShowAddTagModal(false)
                  } else {
                    toast.error('Invalid or duplicate tag')
                  }
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center relative">
      <button
        onClick={() => setShowDeleteModal(false)}
        className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
      >
        &times;
      </button>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h2>
      <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this meal?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            const updated = meals.filter((_, i) => i !== deleteIndex)
            setMeals(updated)
            setShowDeleteModal(false)
            setDeleteIndex(null)
            toast.success('Meal deleted')
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => {
            setShowDeleteModal(false)
            setDeleteIndex(null)
          }}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

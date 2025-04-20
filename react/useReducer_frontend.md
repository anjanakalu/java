Nice! Let's upgrade it to support **multiple filters**: by **occupation** and **gender**, in addition to the search and sort.

I'll:
- Add a dropdown for gender filtering.
- Update the reducer state and logic to handle multiple filters together.
- Apply all filters together in the derived `visibleProfiles`.

---

### ✅ Updated Full Code with Gender Filter

```jsx
import React, { useReducer } from 'react';

const initialState = {
  allProfiles: [
    { id: 101, name: 'Ram', occupation: 'Student', age: 30, gender: 'Male', nationality: 'Nepal' },
    { id: 102, name: 'Sita', occupation: 'Engineer', age: 28, gender: 'Female', nationality: 'India' },
    { id: 103, name: 'Hari', occupation: 'Doctor', age: 35, gender: 'Male', nationality: 'Bhutan' },
    { id: 104, name: 'Gita', occupation: 'Student', age: 32, gender: 'Female', nationality: 'Nepal' },
    { id: 105, name: 'Krishna', occupation: 'Engineer', age: 25, gender: 'Male', nationality: 'India' },
    { id: 106, name: 'Radha', occupation: 'Doctor', age: 29, gender: 'Female', nationality: 'Bhutan' },
    { id: 107, name: 'Binod', occupation: 'Student', age: 22, gender: 'Male', nationality: 'Nepal' },
    { id: 108, name: 'Anita', occupation: 'Engineer', age: 34, gender: 'Female', nationality: 'India' },
    { id: 109, name: 'Bikash', occupation: 'Doctor', age: 31, gender: 'Male', nationality: 'Bhutan' },
    { id: 110, name: 'Mina', occupation: 'Student', age: 27, gender: 'Female', nationality: 'Nepal' }
  ],
  sortOrder: 'asc',
  searchText: '',
  filterOccupation: '',
  filterGender: ''
};

const ACTION_TYPES = {
  SET_SORT_ORDER: 'SET_SORT_ORDER',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_FILTER_OCCUPATION: 'SET_FILTER_OCCUPATION',
  SET_FILTER_GENDER: 'SET_FILTER_GENDER'
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };

    case ACTION_TYPES.SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload };

    case ACTION_TYPES.SET_FILTER_OCCUPATION:
      return { ...state, filterOccupation: action.payload };

    case ACTION_TYPES.SET_FILTER_GENDER:
      return { ...state, filterGender: action.payload };

    default:
      return state;
  }
};

const Homepage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSortChange = (e) => {
    dispatch({ type: ACTION_TYPES.SET_SORT_ORDER, payload: e.target.value });
  };

  const handleSearchChange = (e) => {
    dispatch({ type: ACTION_TYPES.SET_SEARCH_TEXT, payload: e.target.value });
  };

  const handleOccupationFilterChange = (e) => {
    dispatch({ type: ACTION_TYPES.SET_FILTER_OCCUPATION, payload: e.target.value });
  };

  const handleGenderFilterChange = (e) => {
    dispatch({ type: ACTION_TYPES.SET_FILTER_GENDER, payload: e.target.value });
  };

  const getFilteredSortedProfiles = () => {
    let result = [...state.allProfiles];

    // Search by name
    if (state.searchText) {
      result = result.filter(profile =>
        profile.name.toLowerCase().includes(state.searchText.toLowerCase())
      );
    }

    // Filter by occupation
    if (state.filterOccupation) {
      result = result.filter(profile =>
        profile.occupation.toLowerCase() === state.filterOccupation.toLowerCase()
      );
    }

    // Filter by gender
    if (state.filterGender) {
      result = result.filter(profile =>
        profile.gender.toLowerCase() === state.filterGender.toLowerCase()
      );
    }

    // Sort by age
    result.sort((a, b) =>
      state.sortOrder === 'asc' ? a.age - b.age : b.age - a.age
    );

    return result;
  };

  const visibleProfiles = getFilteredSortedProfiles();

  return (
    <div>
      <h2>User Profiles</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <label>Sort by Age: </label>
        <select onChange={handleSortChange} value={state.sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label>Search by Name: </label>
        <input type="text" onChange={handleSearchChange} placeholder="Search name..." />

        <label>Filter by Occupation: </label>
        <select onChange={handleOccupationFilterChange} value={state.filterOccupation}>
          <option value="">All</option>
          <option value="Student">Student</option>
          <option value="Engineer">Engineer</option>
          <option value="Doctor">Doctor</option>
        </select>

        <label>Filter by Gender: </label>
        <select onChange={handleGenderFilterChange} value={state.filterGender}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        {visibleProfiles.length > 0 ? (
          visibleProfiles.map(profile => (
            <div key={profile.id}>
              {profile.id} - {profile.name} - {profile.occupation} - {profile.age} - {profile.gender} - {profile.nationality}
            </div>
          ))
        ) : (
          <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
```

---

### ✅ Now Supports:
- **Sort** by age
- **Search** by name
- **Filter** by occupation
- **Filter** by gender  

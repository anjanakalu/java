The **complete working example** of your `Homepage` component using **Apollo Client** and GraphQL, where **sorting, filtering, and searching** are handled on the **backend**.

---

### ✅ Requirements:

- You must have Apollo Client set up and wrapped with `ApolloProvider` at the root.
- Your backend must support the following query and input arguments: `searchText`, `sortOrder`, `occupation`, `gender`.

---

### ✅ Complete `Homepage.jsx` using GraphQL

```jsx
import React, { useReducer } from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query
const GET_USER_PROFILES = gql`
  query GetUserProfiles(
    $searchText: String
    $sortOrder: SortOrder
    $filterOccupation: String
    $filterGender: String
  ) {
    userProfiles(
      searchText: $searchText
      sortOrder: $sortOrder
      occupation: $filterOccupation
      gender: $filterGender
    ) {
      id
      name
      occupation
      age
      gender
      nationality
    }
  }
`;

// Reducer & initial state
const initialState = {
  sortOrder: 'asc',
  searchText: '',
  filterOccupation: '',
  filterGender: '',
};

const ACTION_TYPES = {
  SET_SORT_ORDER: 'SET_SORT_ORDER',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_FILTER_OCCUPATION: 'SET_FILTER_OCCUPATION',
  SET_FILTER_GENDER: 'SET_FILTER_GENDER',
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

  const { data, loading, error } = useQuery(GET_USER_PROFILES, {
    variables: {
      searchText: state.searchText,
      sortOrder: state.sortOrder,
      filterOccupation: state.filterOccupation,
      filterGender: state.filterGender,
    },
  });

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

  return (
    <div>
      <h2>User Profiles</h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <label>Sort by Age:</label>
        <select onChange={handleSortChange} value={state.sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label>Search by Name:</label>
        <input type="text" onChange={handleSearchChange} placeholder="Search name..." />

        <label>Filter by Occupation:</label>
        <select onChange={handleOccupationFilterChange} value={state.filterOccupation}>
          <option value="">All</option>
          <option value="Student">Student</option>
          <option value="Engineer">Engineer</option>
          <option value="Doctor">Doctor</option>
        </select>

        <label>Filter by Gender:</label>
        <select onChange={handleGenderFilterChange} value={state.filterGender}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading profiles</p>}

        {data?.userProfiles?.length > 0 ? (
          data.userProfiles.map((profile) => (
            <div key={profile.id}>
              {profile.id} - {profile.name} - {profile.occupation} - {profile.age} - {profile.gender} - {profile.nationality}
            </div>
          ))
        ) : (
          !loading && <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
```

---

### ✅ Backend expectations

Your backend schema should have something like:

```graphql
enum SortOrder {
  asc
  desc
}

type Query {
  userProfiles(
    searchText: String
    sortOrder: SortOrder
    occupation: String
    gender: String
  ): [UserProfile]
}
```

---

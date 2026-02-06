# Rick and Morty Explorer

## Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## API Usage

The app consumes the public Rick and Morty GraphQL API using Apollo Client.

### Implemented GraphQL Queries

#### 1. Character List (`GET_CHARACTERS`)
Used to populate the sidebar and drive search.

*   **Variables**:
    *   `page`: (Int) Controls pagination. Starts at 1.
    *   `filter`: (FilterCharacter) Object that contains:
        *   `name`: (String) Search term entered by the user.
        *   `species`: (String) Species filter (e.g., "Human", "Alien") when different from "All".
*   **Response Handling**:
    *   **Infinite Scroll**: Uses `info.next` to detect additional pages. When the scroll reaches the bottom, `fetchMore` is called to request the next page and merge results.
    *   **Exclusion Filter**: Results from the API (`data.characters.results`) are filtered on the client to exclude characters already in the local "Favorites" list (`starredCharacters`), preventing duplicates in the UI.
    *   **Sorting**: Although the API returns results sorted by ID, the app applies client-side alphabetical sorting (ascending/descending) on the received data.
    *   **Metadata**: Uses `info.count` to show the total number of results that match the API filters.

#### 2. Character Detail (`GET_CHARACTER`)
Used to render the detail panel (`DetailPanel`).

*   **Variables**:
    *   `id`: (ID) Unique character identifier pulled from the URL or list selection.
*   **Requested Data**:
    *   Scalar fields: `name`, `species`, `status`, `gender`, `type`, `image`.
    *   Nested objects:
        *   `origin`: Uses the `name` field.
        *   `location`: Uses the `name` field.
*   **Behavior**: The query is skipped (`skip: !characterId`) when there is no selected ID.

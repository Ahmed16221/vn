import { gql } from "apollo-boost";
const profiles = {
  getProfiles: gql`
    query GetAllProfiles(
      $orderBy: globalOrderBy
      $searchString: String
      $rows: Int
      $page: Int
    ) {
      getAllProfiles(
        orderBy: $orderBy
        searchString: $searchString
        rows: $rows
        page: $page
      ) {
        size
        profiles {
          id
          first_name
          last_name
          email
          is_verified
          image_url
          description
        }
      }
    }
  `,

  profileMutation: gql`
    mutation UpdateProfile(
      $updateProfileId: String!
      $firstName: String!
      $lastName: String!
      $email: String!
      $isVerified: Boolean!
      $imageUrl: String!
      $description: String!
    ) {
      updateProfile(
        id: $updateProfileId
        first_name: $firstName
        last_name: $lastName
        email: $email
        is_verified: $isVerified
        image_url: $imageUrl
        description: $description
      ) {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  `,
  deleteProfileMutation: gql`
    mutation DeleteProfile($deleteProfileId: String!) {
      deleteProfile(id: $deleteProfileId)
    }
  `,

  addprofile: gql`
    mutation CreateProfile(
      $firstName: String!
      $lastName: String!
      $email: String!
      $isVerified: Boolean!
      $imageUrl: String!
      $description: String!
    ) {
      createProfile(
        first_name: $firstName
        last_name: $lastName
        email: $email
        is_verified: $isVerified
        image_url: $imageUrl
        description: $description
      ) {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  `,
};

export { profiles };

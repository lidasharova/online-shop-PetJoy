import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCategories, getProducts } from '@/store/slices/productSlice';
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
} from '@mui/material';
import ProductList from './products/ProductList';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);

  const dispatch = useAppDispatch();

  const getCategoryList = (): void => {
    void dispatch(getProducts());
  };

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, []);

  return (
    <>
      <Container>
        <Button
          variant="outlined"
          onClick={getCategoryList}
        >
          Load Categories list
        </Button>
        {/* <div>{JSON.stringify(categories)}</div> */}
        <Box>
          <List>
            {categories.map(({ id, description, key, name }) => {
              return (
                <ListItem
                  key={id}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText primary={JSON.stringify(name)} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#simple-list"
            >
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem> */}
          </List>
        </Box>
        <ProductList />
      </Container>
    </>
  );
};

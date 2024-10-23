import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  filteredProducts: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capture the search query from the URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.filterProducts(); // Filter products based on the search term
    });
  }

  // Function to filter products by search term (you can replace with your own API logic)
  filterProducts(): void {
    // Assuming you have a list of products in your app, you can filter them
    // Here I'm using a static list as an example
    const allProducts = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Smartphone' },
      { id: 3, name: 'Headphones' }
    ];

    this.filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

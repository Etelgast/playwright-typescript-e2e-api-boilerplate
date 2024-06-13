import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {Link} from '../components/Link'


export class NotesPage extends BasePage {
    homeLink: Link

    constructor(public page: Page) {
        super(page)

        this.homeLink = new Link({page, locator: this.page.getByTestId('home'), name: 'Home'})
    }
}
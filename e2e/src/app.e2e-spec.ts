'use strict'; // necessary for es6 output in node
import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1: string = 'Tour of Heroes';
const expectedTitle: string = `${expectedH1}`;
const targetHero = { id: 15, name: 'Magneta' };
const targetHeroDashboardIndex = 4;
const nameSuffix = 'X';
const newHeroName = targetHero.name + nameSuffix;
const getPageElements = () => {
  const navElements: ElementArrayFinder = element.all(by.css('app-root nav a'));

  return {
    navElements,
    appDashboardHref: navElements.get(0),
    appDashboard: element(by.css('app-root app-dashboard')),
    topHeroes: element.all(by.css('app-root app-dashboard > div h4')),
    appHeroesHref: navElements.get(1),
    appHeroes: element(by.css('app-root app-heroes')),
    allHeroes: element.all(by.css('app-root app-heroes li')),
    selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),
    heroDetail: element(by.css('app-root app-hero-detail > div')),
    searchBox: element(by.css('#search-box')),
    searchResults: element.all(by.css('.search-result li')),
  };
};
const addToHeroName = (text: string): promise.Promise<void> => {
  const input: ElementFinder = element(by.css('input'));

  return input.sendKeys(text);
};
const updateHeroNameInDetailView = async () => {
  // Assumes that the current view is the hero details view.
  addToHeroName(nameSuffix);

  const page = getPageElements();
  const hero = await Hero.fromDetail(page.heroDetail);

  expect(hero.id).toEqual(targetHero.id);
  expect(hero.name).toEqual(newHeroName.toUpperCase());
};
const expectHeading = (hLevel: number, expectedText: string) => {
  const hTag = `h${hLevel}`;
  const hText = element(by.css(hTag)).getText();

  expect(hText).toEqual(expectedText, hTag);
};
const getHeroAEltById = (id: number): ElementFinder => {
  const spanForId = element(by.cssContainingText('li span.badge', id.toString()));

  return spanForId.element(by.xpath('..'));
};
const getHeroLiEltById = (id: number): ElementFinder => {
  const spanForId = element(by.cssContainingText('li span.badge', id.toString()));

  return spanForId.element(by.xpath('../..'));
};
const toHeroArray = async (allHeroes: ElementArrayFinder): Promise<Hero[]> => {
  const promisedHeroes = await allHeroes.map(Hero.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()

  return <Promise<any>> Promise.all(promisedHeroes);
};
const dashboardSelectTargetHero = async () => {
  const targetHeroElt = getPageElements().topHeroes.get(targetHeroDashboardIndex);

  expect(targetHeroElt.getText()).toEqual(targetHero.name);
  targetHeroElt.click();
  browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

  const page = getPageElements();

  expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
  const hero = await Hero.fromDetail(page.heroDetail);

  expect(hero.id).toEqual(targetHero.id);
  expect(hero.name).toEqual(targetHero.name.toUpperCase());
};

class Hero {
  id: number;
  name: string;

  // Factory methods

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
      const stringsFromA = await li.all(by.css('a')).getText();
      const strings = stringsFromA[0].split(' ');

      return { id: +strings[0], name: strings[1] };
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    const id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    const name = await detail.element(by.css('h2')).getText();

    return {
        id: +id.substr(id.indexOf(' ') + 1),
        name: name.substr(0, name.lastIndexOf(' ')),
    };
  }
}

describe('Tutorial part 6', () => {
  beforeAll(() => browser.get(''));

  describe('Initial page', () => {
    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Dashboard', 'Heroes'];

    it(`has views ${expectedViewNames}`, () => {
      const viewNames = getPageElements().navElements.map((el: ElementFinder) => el.getText());

      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', () => {
      const page = getPageElements();

      expect(page.appDashboard.isPresent()).toBeTruthy();
    });
  });

  describe('Dashboard tests', () => {
    beforeAll(() => browser.get(''));

    it('has top heroes', () => {
      const page = getPageElements();
      const expectedCount: number = 5;

      expect(page.topHeroes.count()).toEqual(expectedCount);
    });

    it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`cancels and shows ${targetHero.name} in Dashboard`, () => {
      element(by.buttonText('go back')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      const targetHeroElt = getPageElements().topHeroes.get(targetHeroDashboardIndex);

      expect(targetHeroElt.getText()).toEqual(targetHero.name);
    });

    it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`saves and shows ${newHeroName} in Dashboard`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      const targetHeroElt = getPageElements().topHeroes.get(targetHeroDashboardIndex);

      expect(targetHeroElt.getText()).toEqual(newHeroName);
    });
  });

  describe('Heroes tests', () => {
    beforeAll(() => browser.get(''));

    it('can switch to Heroes view', () => {
      getPageElements().appHeroesHref.click();
      const page = getPageElements();
      const expectedCount: number = 10;

      expect(page.appHeroes.isPresent()).toBeTruthy();
      expect(page.allHeroes.count()).toEqual(expectedCount, 'number of heroes');
    });

    it('can route to hero details', async () => {
      getHeroLiEltById(targetHero.id).click();

      const page = getPageElements();

      expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
      const hero = await Hero.fromDetail(page.heroDetail);

      expect(hero.id).toEqual(targetHero.id);
      expect(hero.name).toEqual(targetHero.name.toUpperCase());
    });

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`shows ${newHeroName} in Heroes list`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular();
      const expectedText = `${targetHero.id} ${newHeroName}`;

      expect(getHeroAEltById(targetHero.id).getText()).toEqual(expectedText);
    });

    it(`deletes ${newHeroName} from Heroes list`, async () => {
      const heroesBefore = await toHeroArray(getPageElements().allHeroes);
      const li = getHeroLiEltById(targetHero.id);

      li.element(by.buttonText('x')).click();

      const page = getPageElements();
      const expectedCount: number = 9;

      expect(page.appHeroes.isPresent()).toBeTruthy();
      expect(page.allHeroes.count()).toEqual(expectedCount, 'number of heroes');
      const heroesAfter = await toHeroArray(page.allHeroes);
      // console.log(await Hero.fromLi(page.allHeroes[0]));
      const expectedHeroes = heroesBefore.filter((h) => h.name !== newHeroName);

      expect(heroesAfter).toEqual(expectedHeroes);
      // expect(page.selectedHeroSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetHero.name}`, async () => {
      const testNewHeroName = 'Alice';
      const heroesBefore = await toHeroArray(getPageElements().allHeroes);
      const numHeroes = heroesBefore.length;

      element(by.css('input')).sendKeys(testNewHeroName);
      element(by.buttonText('add')).click();

      const page = getPageElements();
      const heroesAfter = await toHeroArray(page.allHeroes);

      expect(heroesAfter.length).toEqual(numHeroes + 1, 'number of heroes');

      expect(heroesAfter.slice(0, numHeroes)).toEqual(heroesBefore, 'Old heroes are still there');

      const maxId = heroesBefore[heroesBefore.length - 1].id;

      expect(heroesAfter[numHeroes]).toEqual({id: maxId + 1, name: testNewHeroName});
    });

    it('displays correctly styled buttons', async () => {
      element.all(by.buttonText('x')).then((buttons) => {
        for (const button of buttons) {
          // Inherited styles from styles.css
          expect(button.getCssValue('font-family')).toBe('Arial, sans-serif');
          expect(button.getCssValue('border')).toContain('none');
          expect(button.getCssValue('padding')).toBe('5px 10px');
          expect(button.getCssValue('border-radius')).toBe('4px');
          // Styles defined in heroes.component.css
          expect(button.getCssValue('left')).toBe('194px');
          expect(button.getCssValue('top')).toBe('-32px');
        }
      });

      const addButton = element(by.buttonText('add'));
      // Inherited styles from styles.css

      expect(addButton.getCssValue('font-family')).toBe('Arial, sans-serif');
      expect(addButton.getCssValue('border')).toContain('none');
      expect(addButton.getCssValue('padding')).toBe('5px 10px');
      expect(addButton.getCssValue('border-radius')).toBe('4px');
    });
  });

  describe('Progressive hero search', () => {
    const sleepDuration: number = 1000;

    beforeAll(() => browser.get(''));

    it(`searches for 'Ma'`, async () => {
      const expectedCount: number = 4;

      getPageElements().searchBox.sendKeys('Ma');
      browser.sleep(sleepDuration);

      expect(getPageElements().searchResults.count()).toBe(expectedCount);
    });

    it(`continues search with 'g'`, async () => {
      const expectedCount: number = 2;

      getPageElements().searchBox.sendKeys('g');
      browser.sleep(sleepDuration);
      expect(getPageElements().searchResults.count()).toBe(expectedCount);
    });

    it(`continues search with 'e' and gets ${targetHero.name}`, async () => {
      const expectedCount: number = 1;

      getPageElements().searchBox.sendKeys('n');
      browser.sleep(sleepDuration);
      const page = getPageElements();

      expect(page.searchResults.count()).toBe(expectedCount);
      const hero = page.searchResults.get(0);

      expect(hero.getText()).toEqual(targetHero.name);
    });

    it(`navigates to ${targetHero.name} details view`, async () => {
      const hero = getPageElements().searchResults.get(0);

      expect(hero.getText()).toEqual(targetHero.name);
      hero.click();

      const page = getPageElements();

      expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
      const hero2 = await Hero.fromDetail(page.heroDetail);

      expect(hero2.id).toEqual(targetHero.id);
      expect(hero2.name).toEqual(targetHero.name.toUpperCase());
    });
  });
});
